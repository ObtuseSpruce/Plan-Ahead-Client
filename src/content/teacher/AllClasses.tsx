import React, {useEffect, useState, FormEvent} from 'react'
import {Redirect} from 'react-router-dom'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

//Interface models for typescript
interface PropsInt {
    user: {
        firstname: string,
        pic: string,
        position: string,
        _id: Object
    }
  }

  interface classIdModel {
      classId: number | string
  }

interface ClassModel {
    _id:        number;
    classname:  string;
    subject:    string;
    teacher:   string;
    students:   Array<string>;
    assignments: Array<string>;
    startdate:  Date;
    enddate:    Date;
}
interface homeworkModel {
    _id: string,
    question:  string,
    dateDue: Date,
    dateAssigned: Date,
    teacher: string,
    students: Array<string>,
    class: string,
  }


const AllClasses : React.FC<PropsInt> = (props) => {

    // useStates called and interface models integrated
    let [classes, setclasses] = useState<ClassModel[]>([])
    let [classId, setClassId] = useState('')
    let [allHw, setAllHw] = useState<homeworkModel[]>([])
    let [message, setMessage] = useState('')


    // Function to get all the assignments/homeowkr offered by this class and sets the state allHw with the data
      const callHwApi =()=>{
          if(classId){
        fetch(process.env.REACT_APP_SERVER_URL + 'assignments/class/' + classId)
        .then(response=> response.json())
        .then(data =>{
            setAllHw(data)
            console.log(data)
        })
        .catch(err=>{
            console.log("err in allClasses page for the teacher ",err)
        })
        }
      }

        // Function to get all the classes offered by this teacher and sets the state classes with the data
        const callApi =(url: string)=>{
          fetch(process.env.REACT_APP_SERVER_URL + 'classes' + url + props.user._id)
          .then(response=> response.json())
          .then(data =>{
              console.log(data)
              setclasses(data)
          })
          .catch(err=>{
              console.log("err in allClasses page for the teacher ",err)
          })
      }

      useEffect(() => {
          // checks the user to see if they are a student or teacher
          // and sets the variable 'url' to that value
          // this is for the fetch calls
        if(props.user ){
            let  userStr = props.user.position.toLowerCase()
            let url
            if(userStr == 'teacher') { url= '/teacher/' }
            else {  url = '/student/' }
            // call the api functions at component load
            callApi(url)
        }
      }, [])

     // Protect this route- to only teachers can view this page
    if(!props.user) {
    return <Redirect to='/login'/>
    }
    let userStr = props.user.position.toLowerCase() 
    if(userStr !== "teacher"){
        return <Redirect to='/profile'/>
    }

    // maps over the classes array and returns a menu item
    let allClasses = classes.map((cl, i) => {
        return (
            <MenuItem value={cl._id}>
                {cl.classname}
            </MenuItem>
        )
    })


    // maps over the homework array and generates
    // a box that displays homework content and
    // has two buttons attached to it. One deletes
    // the homework entry and the other allows the user
    // to view the homework with more depth

    let classHomeworkMap = allHw.map((hw, i) => {
        let url = '/viewhw/'+ hw._id
        return (
            <Box>
                <div className="inputField">
                <div>
                    {hw.question}
                </div>
                <div>
                </div>
                <Button variant="contained">
                    <a href={url}> view homework</a>
                </Button>  
                <Button variant="contained" value={hw._id} onClick={() => {

                    // this fetch command deletes the homework.
                    // As this is the only place the delete button is called
                    // it has been nested in the function, however this could be
                    // popped out and the hw._id set to a state to make this
                    // a global scoped function
                    
                    fetch(process.env.REACT_APP_SERVER_URL + 'assignments/' + hw._id, {
                        method: 'DELETE',
                        headers: {  'Content-Type' : 'application/json' }
                        })
                        .then(response => {
                            if (!response.ok){
                              setMessage(`${response.status} : ${response.statusText}`)
                              return
                            }
                            response.json().then(result => {
                            console.log("result!", result)
                            })
                        })
                        .finally(() => {
                            callHwApi()
                        })
                    }
            }>Delete</Button>
                </div>
            </Box>
        )
    })


    return(
    <Box display="flex" justifyContent="center">
        <div className="inputField">
            <h1>View Current Classes & Their Homework</h1>
                <div>
                    <div>
                        <InputLabel id="classname">Classname: </InputLabel>
                        <Select onChange={(e: any) => {
                            setClassId(e.target.value)
                        }}>
                            <MenuItem value="" selected>Select Class</MenuItem>
                            {allClasses}
                        </Select>
                    </div>
                    <div>
                    <Button onClick={() =>{
                        console.log(classId)
                        callHwApi()
                    }}>View Class Homework</Button>
                    </div>
                    <Box justifyContent="center" display="flex">
                        {classHomeworkMap}
                    </Box>
            </div>
        </div>
    </Box>
    )
}

export default AllClasses