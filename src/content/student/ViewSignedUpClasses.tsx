import React, { useState , useEffect } from 'react'
import {Redirect} from 'react-router-dom'

interface PropsInt {
    user: {
        firstname: string,
        pic: string,
        position: string,
        _id: Object
    }
  }

  interface ClassModel {
    classname:  string;
    subject:    string;
    teacher:   string;
    students:   Array<string>;
    assignments: Array<string>;
    startdate:  Date;
    enddate:    Date;
}

const ViewSignedUpClasses  : React.FC<PropsInt> = (props) => {

    let [classes, setclasses] = useState<ClassModel[]>([])
    let [message, setMessage] = useState('')

    // Getting all the classes that a student has signed up for from the server
    const callApi =()=>{
        let studentId = props.user._id
        fetch(process.env.REACT_APP_SERVER_URL + 'classes/student/'+studentId)
        .then(response=> {response.json()
                console.log("Here is the response!", response)
                if (!response.ok){
                setMessage(`${response.status} : ${response.statusText}`)
                return
                }
                response.json()
                .then(data =>{
                    console.log(data)
                    setclasses(data)
                })
        })
        .catch(err=>{
            console.log("err in Api call on viewSignedupClass page",err)
        })
    }

    useEffect(() => {
        if(props.user ){
            let  userStr = props.user.position.toLowerCase()
            if(userStr !== 'teacher'){
                callApi()
            }
        }
    }, [])

    // Protect this route- to only students can view this page
    if(!props.user) {
    return <Redirect to='/login'/>
    }
    let userStr = props.user.position.toLowerCase() 
    if(userStr == "teacher"){
        return <Redirect to='/profile'/>
    }

    let allClasses =  classes.map((cl, i)=>{    
        return(
            <tr key= {i}>
                    <td>{cl.classname} </td>
                    <td>{cl.subject}</td>
                    <td>{cl.startdate}</td>
                    <td>{cl.teacher}</td>
                    <td>{cl.enddate}</td>
            </tr>
        )
    })

   return(
          <div>
               <h2>Sign Up for Class</h2>
                <span className="red">{message}</span>
                <div className="signedUpTable">
                    <table>
                          <thead>
                                <tr>
                                    <th>Select</th>
                                    <th>ClassName</th>
                                    <th>Subject</th>
                                    <th> Start Date</th>
                                    <th>Teacher</th>
                                    <th>End Date</th>
                                </tr>
                            </thead>
                            <tbody> 
                                    {allClasses}
                            </tbody>
                            </table>
                </div>
          </div>
          )
    }

export default ViewSignedUpClasses  