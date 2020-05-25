import React, { useState, useEffect } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom'


interface PropsInt {
    user: {
        firstname: string,
        position: string,
        _id: Object
    }
  }

  interface ClassModel {
    select?: boolean; 
    _id: Object; 
    classname:  string;
    subject:    string;
    teachername:   string;
    students?:   Array<string>;
    assignments?: Array<string>;
    startdate:  Date;
    enddate:    Date;
}


const SignupClass : React.FC<PropsInt> = (props) => {
    let [classes, setClasses] = useState<ClassModel[]>([])
    let [selectedClasses, setSelectedClasses]= useState<ClassModel[]>([])
    let [message, setMessage] = useState('')
    let [referRedirect, setReferRedirect] = useState(false)


    // Function to call the API and retrieve the classes
    const callApi =()=>{
        fetch(process.env.REACT_APP_SERVER_URL + 'classes')
        .then(response=> response.json())
        .then(data=>{
            let studentId = props.user._id
            // Call to server to retrive the classes that student has already signed up for
            fetch(process.env.REACT_APP_SERVER_URL + 'classes/student/'+studentId)
            .then(resp=>  resp.json() )
            .then(nestedData =>{
                console.log('nestedData: student signed classes ',nestedData)
                classes = data;
                if(nestedData.length !== 0){
                    classes.forEach((cl)=>{
                        nestedData.forEach((nd: ClassModel)=>{
                            if(cl._id == nd._id){ cl.select = true  }
                        })        
                    }) 
                }
                setClasses(classes)
                let classselected = classes.filter((cl)=>{
                    return cl.select == true
                })
                console.log("classselected",classselected)
                console.log("cl now ",classes)
                setSelectedClasses(classselected)
            })
        })
        .catch(err=>{
            console.log("err in Api call on SignUp Class page",err)
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

    // Protect route- to only students can view this page
        if(!props.user) {
            return <Redirect to='/login'/>
         }
        let userStr = props.user.position.toLowerCase() 
        if(userStr == "teacher"){
            return <Redirect to='/profile'/>
        }

    //  Redirect to the page where user can see all the classes    
        if(referRedirect){
            return <Redirect to='/viewsignedclasses'/>
        }
    
    // Creates table rows for classes    
    let allClasses =  classes.map((cl, i)=>{
           console.log("cl",cl._id,cl.select)
        return (
                <tr key= {i}>
                    <TableCell>
                            <input type="checkbox" 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
                            let checked = event.target.checked
                            let classesWithSelect = classes.map((c,i)=>{
                                    if(cl._id === c._id){
                                        c.select = checked 
                                        console.log("c.select",c.select)
                                        console.log("c",c)
                                    }
                                    return c
                                }).filter((c)=>{
                                    return c.select
                                })
                                setSelectedClasses(classesWithSelect)
                        }} 
                        checked={cl.select}></input>
                    </TableCell> 
                    <TableCell>{cl.classname} </TableCell>
                    <TableCell>{cl.subject}</TableCell>
                    <TableCell>{cl.startdate}</TableCell>
                    <TableCell>{cl.teachername}</TableCell>
                    <TableCell>{cl.enddate}</TableCell>
                </tr>
        )    
    })
  
    // All the classes (in the form of class id) selected by student are sent to the server 
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        let  classes :Array<string>  = []
        console.log("selectedClasses",selectedClasses)
        classes = selectedClasses.map((cl,i)=>{
             return cl._id.toString()
        })
        console.log("class id selected",classes)      
        fetch(process.env.REACT_APP_SERVER_URL + 'users/classes/'+props.user._id, {
            method: 'PUT',
            body: JSON.stringify({
                classes
            }),
            headers: {  'Content-Type' : 'application/json' }
          })
        .then(response => {
            console.log("Here is the response!", response)
            if (!response.ok){
              setMessage(`${response.status} : ${response.statusText}`)
              return
            }
            response.json().then(result => {
            console.log("result!", result)
            })
        })
        .catch(err => {
            console.log('error in signup class submit', err)
        })
        .finally(()=>{
             // set the referRedirect to true, to redirect to the page where user can see all the classes
             setReferRedirect(true)
        })
        
    }

   return(
          <div className="inputField">
                <h2>Sign Up for Class</h2>
                <span className="red">{message}</span>
                <div className="signUpTable">
                    <form onSubmit={handleSubmit}> 
                        <Button type="submit" variant="contained">Register for Classes</Button>
                    </form> 
                        <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Select</TableCell>
                                        <TableCell>ClassName</TableCell>
                                        <TableCell>Subject</TableCell>
                                        <TableCell> Start Date</TableCell>
                                        <TableCell>Teacher</TableCell>
                                        <TableCell>End Date</TableCell>
                                    </TableRow>
                                </TableBody>
                                <TableBody> 
                                    {allClasses}
                                </TableBody>
                        </Table>
                </div>
          </div>
          )
    }

export default SignupClass 