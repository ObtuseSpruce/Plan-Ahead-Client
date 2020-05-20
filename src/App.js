// Import packages
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

// Resources and custom components
import './App.css';
import Content from './content/Content'
import Footer from './nav/Footer'
import Header from './nav/Header'
import Nav from './nav/Nav'

const App = props => {
  // Declare state variables
  let [user, setUser] = useState(null)

  useEffect(() => {
    decodeToken()
  }, [])

  const decodeToken = () => {
    let token = localStorage.getItem("boilerToken")
    if (token) {
      let decodeUser = jwtDecode(token)
      if(!decodeUser || Date.now() > decodeUser.exp * 1000){
        console.log('expired or bad token')
        setUser(null)
      } else {
        console.log('user and token good!')
        setUser(decodeUser)
      }
    } else {
      console.log('no token found')
      setUser(null)
    }
  }

  const updateToken = (newToken) => {
    localStorage.setItem('boilerToken', newToken || '')
    decodeToken()
  }

  return (
    <Router>
      <div className="App">
        <Nav user={user} updateToken={updateToken}/>
        <Header />
        <main>
          <Content user={user} updateToken={updateToken}/>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
