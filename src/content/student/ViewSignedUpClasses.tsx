import React, { useState , useEffect } from 'react'
import {Redirect} from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

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
    teachername:   string;
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
        .then(response=> response.json())
        .then(data =>{
                    console.log(data)
                    setclasses(data)
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
                    <TableCell>{cl.classname} </TableCell>
                    <TableCell>{cl.subject}</TableCell>
                    <TableCell>{cl.startdate}</TableCell>
                    <TableCell>{cl.teachername}</TableCell>
                    <TableCell>{cl.enddate}</TableCell>
            </tr>
        )
    })

   return(
          <div className="inputField">
               <h2>Registered Classes</h2>
                <span className="red">{message}</span>
                <div className="signedUpTable">
                    <Table>
                          <thead>
                                <tr>
                                    <TableCell>ClassName</TableCell>
                                    <TableCell>Subject</TableCell>
                                    <TableCell> Start Date</TableCell>
                                    <TableCell>Teacher</TableCell>
                                    <TableCell>End Date</TableCell>
                                </tr>
                            </thead>
                            <TableBody> 
                                    {allClasses}
                            </TableBody>
                    </Table>
                </div>
          </div>
          )
    }

export default ViewSignedUpClasses  