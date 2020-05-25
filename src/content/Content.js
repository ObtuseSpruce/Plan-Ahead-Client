// Packages
import React from 'react'
import { Route } from 'react-router-dom'

// Custom componentd
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import NewClass from './teacher/NewClass'
import ViewHW from '../components/ViewHW'
import TeacherStudentCalendar from '../components/TeacherStudentCalendar'
import NewHW from './teacher/NewHW'
import AllClasses from './teacher/AllClasses'
import SignupClass from './student/SignupClass'
import ViewSignedUpClasses from './student/ViewSignedUpClasses'



const Content = props => {
  return (
    <div className="container">
      <Route exact path="/" component={Home} />
      <Route path="/login" render={
        () => <Login user={props.user} updateToken={props.updateToken}/>
      } />
    
      <Route path="/signup" render={
        () => <Signup user={props.user}  updateToken={props.updateToken}/>
      } />
      <Route path="/calendar" render={
        () => <TeacherStudentCalendar user={props.user}  />
      } />
        <Route path="/profile" render={
        () => <Profile user={props.user} updateToken={props.updateToken}/>
      } />
       <Route path="/viewhw/:id" component={ ViewHW }  />  

      {/*********  TEACHER ROUTES  *********************************/}
      <Route path="/newclass" render={
        () => <NewClass user={props.user}  />
      } />
      <Route path="/homework" render={
        () => <NewHW user={props.user}  />
      } />
      <Route path="/classes" render={
        () => <AllClasses user={props.user}  />
      } />
      
      {/*********  STUDENT ROUTES  *********************************/}      
     
      <Route path="/signupclass" render={
        () => <SignupClass user={props.user}  />
      } />
      <Route path="/viewsignedclasses" render={
        () => <ViewSignedUpClasses user={props.user}  />
      } />

    </div>
  )
}

export default Content
