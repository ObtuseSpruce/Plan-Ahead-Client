//importing components from Node_modules
import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import {AppBar, Button} from '@material-ui/core'
import FrontTheme from '../content/pages/FrontTheme'
import { ThemeProvider } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

//Typescript Interface
interface IUser_UpdateToken { 
  user: {
    firstname: string,
    pic: string,
    position: string
  },
    updateToken: (newToken: string)=>void 
 } 

 
// Nav react component
const Nav: React.FC< IUser_UpdateToken > = props => {
  let [logout, setLogout]= useState(false)
  
  //sets the logout state to true
  const handleLogout = (event: React.FormEvent) => {
    event.preventDefault()
    props.updateToken('')
    setLogout(true)
  }

  //DROP DOWN MENU for PROFILES
  const ProfileMenu = () => {

  //logout event handler
  const handleLogout = (event: React.FormEvent) => {
    event.preventDefault()
    props.updateToken('')
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (e: any) => {
      console.log(e.currentTarget)
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutMenu = (e: React.FormEvent) => {
    handleClose()
    handleLogout(e)
  }

  // return and render the profile nav menu
  return (
    <ThemeProvider theme={FrontTheme}>
    <span>
      <div className="dropDownNav">
      <IconButton
            color="inherit"
            className="downDownIcon"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleClick}
            >
              <AccountCircle />
      </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
          <Link to="/">
              Home
          </Link>
          </MenuItem>
          <MenuItem>
            <div className="buttonNav">
              <Link to="/profile">
                profile   
              </Link>
            </div>
          </MenuItem>
          <MenuItem onClick={handleLogoutMenu}>
            <Link to='/'>
              Logout
            </Link>
          </MenuItem>
        </Menu>
      </div>
    </span>
    </ThemeProvider>
  );
}

//DROP DOWN MENU for SITE NAVIGATION
const NavMenu = () => {

  //logout event handler
  const handleLogout = (event: React.FormEvent) => {
    event.preventDefault()
    props.updateToken('')
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (e: any) => {
      console.log(e.currentTarget)
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //  return and render the main navigation menu
  return (
    <ThemeProvider theme={FrontTheme}>
    <span>
      <div className="navMenu">
      <IconButton
            color="inherit"
            className="downDownIcon"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleClick}
            >
              <p className="navLogo">
                P-A
              </p>
      </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
        <MenuItem onClick={handleClose}>
            {studentLinks}
            {teacherLinks}
          </MenuItem>
        </Menu>
      </div>
    </span>
    </ThemeProvider>
  );
}


// links is the front page login nav bar, only takes you to login and signup
let links = (
    <span>
      <div className="linkNavPos">
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
            <NavMenu />
        </div>
          <ProfileMenu />
      </span>
    )
 
    if(props.user.position == "Teacher" || props.user.position == "teacher" || props.user.position == "TEACHER" ) {
        teacherLinks =  (
         <span>
          <MenuItem>
            <Link to="/calendar">
                Calendar
            </Link>
          </MenuItem>
          <MenuItem>
               <Link to="/newclass">
                   Add Class
               </Link>
           </MenuItem>
           <MenuItem>
           <Link to="/homework">
               add homework
           </Link>
          </MenuItem>
          <MenuItem>
          <Link to="/classes">
              all classes
          </Link>
         </MenuItem>
        </span>
       )
    }
    let userStr = props.user.position.toLowerCase() 
    if( userStr.substr(0, 7)=="student") {
     console.log("inside if")
     studentLinks =(
      <span>
        <MenuItem>
        <div className="buttonNav">
          <Link to="/calendar">
              Calendar
          </Link>
        </div>
        </MenuItem>
        <MenuItem>
          <div className="buttonNav">
              <Link to="/signupclass">
                        Signup For Class
              </Link>
          </div>
        </MenuItem>
        <MenuItem>
          <div className="buttonNav">
            <Link to="/viewsignedclasses">
                  Registered Classes
            </Link>
          </div>
        </MenuItem>
    </span>
     )} 
 }


 

 if(logout){

  return(
    <ThemeProvider theme={FrontTheme}>
    <AppBar>
      <nav>
        {links}
      </nav>
    </AppBar>
    <Redirect to='/login'/>
  </ThemeProvider>
  )  
}
 
  return (
    <ThemeProvider theme={FrontTheme}>
      <AppBar>
        <nav>
          {links}
        </nav>
      </AppBar>
    </ThemeProvider>
  )
}

export default Nav
