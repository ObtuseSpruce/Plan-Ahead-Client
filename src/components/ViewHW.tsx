import React, { useState, useEffect } from 'react';
import  jwtDecode from 'jwt-decode'

interface PropsInt {
  user: {
      firstname: string;
      position: string;
  }
  id: string;
  foo: string;
  exp: number;
  iat: number;
  position: string;
  match: {
    params:{
      id: string;
    }
  }
}

interface ClassModel {
  classname:  string;
  subject:    string;
  teachername: string;
 }

 interface HWModel{
  question: string;
  dateAssigned: Date;
  dateDue: Date;
 }

/**********************************************************************************************
 ViewHW: This component renders a particular homework information for a class.
 This page is available to both student and teachers to view hw details.
 It is rendered when a student/teacher clicks the homework link posted on the calendar 
 for a particular class.
 *********************************************************************************************/ 
const ViewHW: React.FC<PropsInt > = (props) => {
  let [user, setUser] = useState< null | PropsInt>(null)
  let [classInfo, setClassInfo] = useState<ClassModel []>([])
  let [hw, setHw] = useState<HWModel []>([])
  let [msg,setMsg]= useState('')

  // Function to get a particular assignment referenced by the homework id 
  const callApi =()=>{
    console.log("match", props.match)
    if(Object.keys(props.match).length &&  props.match.params.id){
      fetch(process.env.REACT_APP_SERVER_URL + 'assignments/' + props.match.params.id)
      .then(response=> response.json())
      .then(data =>{
            console.log(data)
            console.log("class id",data.class)
            setHw([data])
            // Fetch call to get the class details including the classname and the teacher name for this particular homework
            fetch(process.env.REACT_APP_SERVER_URL + 'classes/' + data.class)
            .then(response=> response.json())
            .then((cl)=>{
                console.log("cl", cl)
                setClassInfo([cl])
          })
          .catch(err=>{
            console.log("error fetching class for the HW on ViewHW",err)
           })
        })
      .catch(err=>{
        console.log("error fetching this HW on ViewHW",err)
        setMsg('No Homework')
      })
    }
  }

  useEffect(() => {
    let authUser = decodeToken()
    console.log("authUser",authUser)
    if(authUser !== null){
      callApi()
    }
  }, [])

  const decodeToken = (): any => {
    let authUser: PropsInt | null = null;
    let token = localStorage.getItem("boilerToken")
    if (token) {
      let decodeUser = jwtDecode<PropsInt>(token)
      if(!decodeUser || Date.now() > decodeUser.exp * 1000){
        console.log('expired or bad token')
        setUser(null)
      } else {
        console.log('user and token good!', decodeUser)
        setUser(decodeUser)
        authUser = decodeUser
      }
    } else {
      console.log('no token found')
      setUser(null)
    }
    return authUser;
  }

  // Protect this route to logged in users. This page is available for both teachers and students
  if(!user) {
    return null
  }

  let hwx = hw.map((h,i)=>{
    return (
        <div key={i}>
          <p>Questions:&nbsp;&nbsp;&nbsp; {h.question}</p>
          <p> Assigned Date:&nbsp;&nbsp;&nbsp; {h.dateAssigned}</p>  
          <p>Due Date:&nbsp;&nbsp;&nbsp; {h.dateDue}  </p>
        </div>
    )
  })

  let clx = classInfo.map((cl,i)=>{
    return(
        <div key={i}>
          <h3>Class Name:&nbsp;&nbsp;&nbsp; {cl.classname}</h3>
          <p>Teacher Name:&nbsp;&nbsp;&nbsp; {cl.teachername}</p>  
        </div>
     ) 
  })

  return (
    <div className="inputField">
      <h2>Homework </h2>
         {clx}
         {hwx}
         {msg}
    </div>
  )
}

export default ViewHW