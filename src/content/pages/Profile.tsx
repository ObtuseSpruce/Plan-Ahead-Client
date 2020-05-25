import React, {useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'

interface PropsInt {
    user: {
        firstname: string,
        pic: string,
        position: string
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
    <div className="inputField">
      <h2> Hello &nbsp; 
        {props.user.firstname} !
      </h2>
       <h3>
          Welcome to your Online School! 
      </h3>
      <h4>Profile: {props.user.position}</h4>
      <hr/>
        <h4>Useful Links and Materials</h4>
       <div>
          <a href="https://www.khanacademy.org/"> Khan academy </a>
       </div>
       <div>
          <a href="https://www.tutorialspoint.com/maths_tutorials.htm"> Math  </a>
       </div>
       <div>
          <a href="https://www.math-only-math.com/math-quiz-b.html"> Math Quiz </a>
       </div>
       <div>
          <a href="https://www.usalearns.org/reading-to-learn-english"> English  </a>
       </div>
       <div>
          <a href="https://www.englishgrammar101.com/"> English Grammar </a>
       </div>
       <div>
          <a href="https://www.cpalms.org/Public/ResourceCollection/Preview/240"> Science </a>
       </div>
       <div>
          <a href="https://www.sophia.org/subjects/social-sciences"> Social Science </a>
       </div>
        <div>
          <img src="student-teacher-learning.png" alt="Teacher teaching student" ></img>
        </div>
    </div>
  )
}

export default Profile
