import React from 'react'
import {Redirect} from 'react-router-dom'


interface PropsInt {
  user: {
      firstname: string,
      pic: string,
      position: string
  }
}

const StudentHome: React.FC<PropsInt> = (props) => {

  if(!props.user) {
    return <Redirect to='/login'/>
  }
  let userStr = props.user.position.toLowerCase() 
   if(userStr == "teacher"){
    return <Redirect to='/profile'/>
  }

  return (
    <div>
      <h2>Student home STUB TSX </h2>
  
    </div>
  )
}

export default StudentHome