// Packages
import React, { useState, FormEvent } from 'react'
import {Redirect} from 'react-router-dom'

interface PropsInt {
    user: {
        firstName: string,
        pic: string,
    }
    updateToken: (newToken: string | null) => void
}

const Signup: React.FC<PropsInt> = props => {
  // Declare and initialize state variables
  let [email, setEmail] = useState('')
  let [firstName, setFirstname] = useState('')
  let [lastName, setLastname] = useState('')
  let [message, setMessage] = useState('')
  let [password, setPassword] = useState('')
  let [profileUrl, setProfileUrl] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // TODO: Send the user sign up data to the server

    fetch(process.env.REACT_APP_SERVER_URL + 'auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        pic: profileUrl,
        email,
        password
      }),
      headers: {
          'Content-Type' : 'application/json'
      }
    })
    .then(response => {
        console.log("Here is the response!", response)
        if (!response.ok){
          setMessage(`${response.status} : ${response.statusText}`)
          return
        }
        response.json().then(result => {
          console.log("result!", result)
          props.updateToken(result.token)
        })
    })
    .catch(err => {
        console.log('error in signup submit in', err)
    })

  }

  if (props.user){
    return <Redirect to="/profile" />
  }


  return (
    <div>
      <h2>Signup</h2>
      <span className="red">{message}</span>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input name="firstName" placeholder="Your first name" onChange={e => setFirstname(e.target.value)} />
        </div>
        <div>
          <label>Last Name:</label>
          <input name="lastName" placeholder="Your last name" onChange={e => setLastname(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Profile Pic URL:</label>
          <input type="url" name="profileUrl" onChange={e => setProfileUrl(e.target.value)} />
        </div>
        <button type="submit">Sign Me Up!</button>
      </form>
    </div>
  )
}

export default Signup
