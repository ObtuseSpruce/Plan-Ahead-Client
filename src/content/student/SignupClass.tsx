import React, { useState, useEffect } from 'react';


interface PropsInt {
    user: {
        firstname: string,
        pic: string,
        position: string,
        _id: Object
    }
  }

 export  interface AllClasses{
     _id: string,
     classname: string
 }

const SignupClass : React.FC<PropsInt> = (props) => {

   let [classes, setClasses] = useState([]) 

    useEffect(() => {
        console.log('Hello!')
        callApi()
      }, [])

    // Function to call the API and retrieve the classes
    const callApi =()=>{
        fetch(process.env.REACT_APP_SERVER_URL + 'classes')
        .then(response=> response.json())
        .then(data=>{
        console.log(data)
        setClasses(data)
        })
        .catch(err=>{
        console.log("err",err)
        })
    }

    let allClasses = classes.map((cl:any, i:number)=>{
        return (
          
            <div> {cl.classname} </div>
        )
              
    })

   return(
          <div>
                <h2>Sign Up for Class</h2>
                <div>{allClasses}</div>

          </div>
          )
    }

export default SignupClass 