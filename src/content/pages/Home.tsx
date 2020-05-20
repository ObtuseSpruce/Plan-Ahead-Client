import React from 'react'
import {Button, Typography} from '@material-ui/core'
import FrontTheme from './FrontTheme'
import { ThemeProvider } from '@material-ui/core/styles';



const Home : React.FC<{}> = () =>{
  return (
    <ThemeProvider theme={FrontTheme}>
      <div>
        <Typography variant="h1" color="primary">Hello World!</Typography>
      </div>
    </ThemeProvider>
  )
}

export default Home