import React from 'react'
import { Link } from 'react-router-dom'
import {AppBar, Button, Typography} from '@material-ui/core'
import FrontTheme from '../content/pages/FrontTheme'
import { ThemeProvider } from '@material-ui/core/styles';


interface IUser_UpdateToken { 
    user: Object | null, 
    updateToken: (newToken: string)=>void 
 } 

 

const Nav: React.FC< IUser_UpdateToken > = props => {
  const handleLogout = (event: React.FormEvent) => {
    event.preventDefault()
    // TODO: Remove the token from localstorage (or cookies)
    // TODO: Update the state of the App
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

  // TODO: If the user is logged in, show profile page and logout links
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
 }
  return (
    <ThemeProvider theme={FrontTheme}>
      <AppBar>
        <nav>     
          <div className="buttonNav" id="homeNav">
            <Link to="/">
              <Button variant="contained" color="primary">
                Home
              </Button>
            </Link>
          </div>
          {links}
        </nav>
      </AppBar>
    </ThemeProvider>
  )
}

export default Nav
