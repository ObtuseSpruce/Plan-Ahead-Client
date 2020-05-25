import React from 'react'
import FrontTheme from './FrontTheme'
import { ThemeProvider } from '@material-ui/core/styles';



const Home : React.FC<{}> = () =>{
  return (
    <ThemeProvider theme={FrontTheme}>
    <div className="homeBox">
      <div className="logoFont">
        <h1>Plan-Ahead</h1>
      </div>
      <div className="bottomLogo">
        <p>~your academic success now~</p>
      </div>
        <img id="imageHome" src="https://www.learnersedge.com/hs-fs/hubfs/student%20and%20teacher%20high%20five-1.jpg?width=2808&name=student%20and%20teacher%20high%20five-1.jpg"></img>
    </div>
    </ThemeProvider>
  )
}

export default Home