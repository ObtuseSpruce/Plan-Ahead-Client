import React from 'react'
import {Typography} from '@material-ui/core'
import FrontTheme from './FrontTheme'
import { ThemeProvider } from '@material-ui/core/styles';



const Home : React.FC<{}> = () =>{
  return (
    <ThemeProvider theme={FrontTheme}>
      <div className="logoFont">
        <h1>Plan-Ahead</h1>
      </div>
      <div className="bottomLogo">
        <p>~your academic success now~</p>
      </div>
    </ThemeProvider>
  )
}

export default Home