// Packages
import React, { useState, FormEvent } from 'react'
import {Redirect} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface PropsInt {
    user: {
        firstName: string,
        pic: string,
    }
    updateToken: (newToken: string | null) => void
}

const Signup: React.FC<PropsInt> = props => {

  const classes = useStyles();

  // Declare and initialize state variables
  let [email, setEmail] = useState('')
  let [firstname, setFirstname] = useState('')
  let [lastname, setLastname] = useState('')
  let [message, setMessage] = useState('')
  let [password, setPassword] = useState('')
  let [birthdate, setBirthdate] = useState('')
  let [position, setPosition] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    //  Send the user sign up data to the server
    fetch(process.env.REACT_APP_SERVER_URL + 'auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
        birthdate,
        position
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
        console.log('error in signup submit in', err)
    })
  }

  if (props.user){
    return <Redirect to="/profile" />
  }

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className="inputField">
    <div className={classes.paper}>
    <Avatar className={classes.avatar}>
    <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
    Sign up
    </Typography>
    <p>{message}</p>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstname"
                variant="outlined"
                required
                fullWidth
                id="firstname"
                label="First Name"
                onChange={e => setFirstname(e.target.value)} 
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                onChange={e => setLastname(e.target.value)}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="date"
                    label="Birthday"
                    type="date"
                    name = "birthdate"
                    onChange={e => setBirthdate(e.target.value)}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                id="outlined-select-position"
                select
                required
                label="teacher/student"
                value={position}
                onChange={e => setPosition(e.target.value)}
                helperText="Sign up as a teacher or a student"
                variant="outlined"
                >
                 <MenuItem value="teacher">Teacher</MenuItem>
                 <MenuItem value="student">Student</MenuItem>
                  </TextField>    
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      </div>
    </Container>
  )
}

export default Signup
