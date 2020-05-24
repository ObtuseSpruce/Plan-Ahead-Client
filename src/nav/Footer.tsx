import React from 'react'
import {Typography} from '@material-ui/core'
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <p className="footerLogo">
      <Link color="inherit" href="https://pugetsoundclient.herokuapp.com/">
          Plan-Ahead
      </Link>{' '}
      </p>
          {new Date().getFullYear()}
          {'.'}
    </Typography>
  );
}

const Footer : React.FC<{  }> = () =>{
  return (
    <footer>
      <Typography variant="body1"> <Copyright />Made by Lars, Ruchita and Will </Typography>
    </footer>
  )
}

export default Footer