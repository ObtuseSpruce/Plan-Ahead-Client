import React, {useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'

interface PropsInt {
    user: {
        firstName: string,
        pic: string,
    }
}

const Profile: React.FC<PropsInt> = (props) => {
  let [secretMessage, setSecretMessage] = useState('')
  
  useEffect(() => {
    let token = localStorage.getItem('boilerToken')
    fetch(process.env.REACT_APP_SERVER_URL + 'profile', {
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    })
    .then( response => {
      console.log('Response', response)

      if(!response.ok){
        setSecretMessage('Nice try!')
        return
      }

      response.json()
      .then(result => {
        console.log(result.message)
        setSecretMessage(result.message)
      })
    })
    .catch(err => {
      console.log(err)
      setSecretMessage('No Message For You!')
    })
  })

  if(!props.user) {
    return <Redirect to='/login'/>
  }

  return (
    <div>
      <h2>
        {props.user.firstName}
      </h2>
      <img src={props.user.pic} alt={props.user.firstName}></img>
    <h2>{secretMessage}</h2>
      </div>
  )
}

export default Profile
