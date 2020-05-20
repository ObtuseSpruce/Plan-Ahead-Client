// Packages
import React from 'react'
import { Route } from 'react-router-dom'

// Custom componentd
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Signup from './pages/Signup'

const Content = props => {
  return (
    <div className="container">
      <Route exact path="/" component={Home} />
      <Route path="/login" render={
        () => <Login user={props.user} updateToken={props.updateToken}/>
      } />
      <Route path="/profile" render={
        () => <Profile user={props.user} updateToken={props.updateToken}/>
      } />
      <Route path="/signup" render={
        () => <Signup user={props.user} updateUser={props.updateUser} />
      } />
    </div>
  )
}

export default Content
