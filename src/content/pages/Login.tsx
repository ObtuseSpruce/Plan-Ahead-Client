// Packages
import React, { useState, FormEvent } from 'react'
import {Redirect} from 'react-router-dom'

interface LoginPage {
    email?: string,
    message?: string,
    password?: string,
}

interface PropsInt {
    user: {exp: number} | null,
    updateToken: (newToken: string) => void
}

const Login: React.FC<PropsInt> = props => {
  // Declare and initialize state variables
  let [email, setEmail] = useState('')
  let [message, setMessage] = useState('')
  let [password, setPassword] = useState('')

  // Event handlers
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('submit', email, password)

    fetch(process.env.REACT_APP_SERVER_URL + 'auth/login', {
      method: 'POST',
      body: JSON.stringify({
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
        console.log('error loggin in', err)
    })
  }

  if (props.user){
    return <Redirect to="/profile" />
  }

  return (
    <div>
      <h2>Login</h2>
      <span className="red">{message}</span>
      <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" name="email" onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit">Beam Me Up!</button>
        </form>
    </div>
  )
}

export default Login
