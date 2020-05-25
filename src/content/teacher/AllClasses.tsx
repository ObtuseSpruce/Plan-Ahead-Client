import React, {useEffect, useState, FormEvent} from 'react'
import {Redirect} from 'react-router-dom'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';


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

    let [classes, setclasses] = useState<ClassModel[]>([])
    let [classId, setClassId] = useState('')
    let [allHw, setAllHw] = useState<homeworkModel[]>([])
    let [message, setMessage] = useState('')


    // Function to get all the classes offered by this teacher and display them
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

    let allClasses = classes.map((cl, i) => {
        return (
            <MenuItem value={cl._id}>
                {cl.classname}
            </MenuItem>
        )
    })

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
                    fetch(process.env.REACT_APP_SERVER_URL + 'assignments/'+ hw._id, {
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