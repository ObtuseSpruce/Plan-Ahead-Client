import React from 'react'
import { Link } from 'react-router-dom'
import {AppBar, Button} from '@material-ui/core'
import FrontTheme from '../content/pages/FrontTheme'
import { ThemeProvider } from '@material-ui/core/styles';
import DownMenu from './DownMenu'


interface IUser_UpdateToken { 
  user: {
    firstname: string,
    pic: string,
    position: string
  },
    updateToken: (newToken: string)=>void 
 } 

 

const Nav: React.FC< IUser_UpdateToken > = props => {
  const handleLogout = (event: React.FormEvent) => {
    event.preventDefault()
    props.updateToken('')
  }

  let links = (
    <span>
      <div className="buttonNav">
        <Link to="/login">
          <Button variant="contained" color="primary" className="buttonNav">
            Login
          </Button>
        </Link>
      </div>
      <div className="buttonNav">
        <Link to="/signup">
          <Button variant="contained" color="primary" className="buttonNav">
            Signup
          </Button>
        </Link>
      </div>
    </span>
  )

  let teacherLinks = (
      <span> </span>
  )

  let studentLinks = (
      <span> </span>
  )  
        
  //  If the user is logged in, show profile page and logout links
  if (props.user){
    links =(
      <span>
       <div className="buttonNav">
         <Link to="/profile">
           <Button variant="contained" color="primary" className="buttonNav">
             profile
           </Button>
         </Link>
       </div>
       <div className="buttonNav">
         <a href='/' onClick={handleLogout}>
           <Button variant="contained" color="primary" className="buttonNav">
             Logout
           </Button>
         </a>
       </div>
      </span>
    )
 
    if(props.user.position == "Teacher" || props.user.position == "teacher" || props.user.position == "TEACHER" ) {
        teacherLinks =  (
         <span>
           <div className="buttonNav">
               <Link to="/newclass">
                 <Button variant="contained" color="primary" className="buttonNav">
                   Add Class
                   </Button>
               </Link>
           </div>
           <div className="buttonNav">
           <Link to="/calendar">
             <Button variant="contained" color="primary" className="buttonNav">
               Calendar
               </Button>
           </Link>
       </div>
        </span>
       )
    }
    let userStr = props.user.position.toLowerCase() 
    if( userStr.substr(0, 7)=="student") {
     console.log("inside if")
     studentLinks =(
      <span>
        <div className="buttonNav">
            <Link to="/student">
              <Button variant="contained" color="primary" className="buttonNav">
                  Student Home
                </Button>
            </Link>
            <Link to="/signupclass">
              <Button variant="contained" color="primary" className="buttonNav">
                  Signup For Class
                </Button>
            </Link>
        </div>
    </span>
     )
   }
       
 }

  return (
    <ThemeProvider theme={FrontTheme}>
      <AppBar>
        <nav>
          <DownMenu updateToken={props.updateToken}/>
          {teacherLinks}
          {studentLinks}
          {links}
        </nav>
      </AppBar>
    </ThemeProvider>
  )
}

export default Nav
