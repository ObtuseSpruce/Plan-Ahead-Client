import React, {useEffect, useState, FormEvent} from 'react';
import {Redirect} from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));


// interface for Class database
interface ClassModel {
  _id: number;
  classname:  string;
  subject:    string;
  teacher:   string;
  students:   Array<string>;
  assignments: Array<string>;
  startdate:  Date;
  enddate:    Date;
}

// interface for Student database
interface StudentModel {
  firstname:  string;
  lastname:    string;
  position:   string;
  _id: number;
}

interface PropsInt {
  user: {
      firstname: string,
      position: string,
      _id: string
  }
}

const NewHW : React.FC<PropsInt> = (props) =>{
    const classes = useStyles();


    let [message, setMessage] =  React.useState<String | null>(null);
    //states for holding database information
    let [allClasses, setAllClasses] = React.useState<ClassModel[]>([])
    let [allUsers, setAllUsers] = React.useState<StudentModel[]>([])
    let [classId, setClassId] =  useState('') 
    let [teacher, setTeacher] = useState('')
    let [question, setQuestion] = useState('')
    let [dateAssigned, setDateAssigned] = useState('')
    let [dateDue, setDateDue] = useState('')
     

    useEffect(() => {
      //calls the database for all Classes
      const callClassApi =()=>{
        fetch(process.env.REACT_APP_SERVER_URL + 'classes')
        .then(response=> response.json())
        .then(data =>{
          console.log(data)
          setAllClasses(data)
        })
        .catch(err=>{
        console.log("error fetching classes",err)
        })
      }
      if(props.user ){
            let  userStr = props.user.position.toLowerCase()
            if(userStr == 'teacher'){
                // call the api functions at component load
                callClassApi()
                setTeacher(props.user._id)
            }
        }
    }, [])

    if(!props.user) {
      return <Redirect to='/login'/>
    }
    let userStr = props.user.position.toLowerCase() 
    if(userStr !== "teacher"){
      return <Redirect to='/profile'/>
    }

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault()
      
      console.log("teacher: ",  teacher)
      console.log("question: ",  question)
      console.log("due Date: ", dateDue)
      console.log("due Date: ", dateAssigned)

      if(classId){
      // sends the new assignment details to the server for this teacher and for a particular class 
            fetch(process.env.REACT_APP_SERVER_URL + 'assignments/class/' + classId, {
              method: 'POST',
              body: JSON.stringify({
                question,
                dateDue,
                dateAssigned,
                teacher
              }),
              headers: {
                'Content-Type' : 'application/json'
            }
            })
            .then(response=>{
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
                  console.log('error in adding new class by teacher', err)
              })
              .finally(()=>{
                setQuestion('')
                setDateAssigned('')
                setDateDue('')
                setClassId('')
                setMessage('')
              })
      }
      else{
        setMessage('Select a class')
      }
    }

    //map function to create option tags for classes
    let allClassOptions = allClasses.map((allc, i) => {
      return (
          <MenuItem value={allc._id}>{allc.classname}</MenuItem>
      )
    })

  // Renders form to create a new assignment/hw by the teacher for a particular class
  if(props.user){
   return(
     <Box display="flex" justifyContent="center">
          <div className="inputField">
                <h2>Create New Assignment</h2>
                <span className="red">{message}</span>
                    <form onSubmit={handleSubmit}>    
                    <div  className="inputBox">
                      <InputLabel id="classname">Classname: </InputLabel>
                      <Select labelId="classname" name="class" value={classId} onChange={(e: any) => {
                        setTeacher(props.user._id)
                        setClassId(e.target.value)} }>
                       <MenuItem value="">
                        Select Class
                       </MenuItem>
                        {allClassOptions}
                      </Select>
                    </div>
                    <Box  display="flex" justifyContent="center" className="textBox">
                        <div>
                          <Input type="hidden" name="teacher" value={teacher}></Input>
                        </div>
                        <div className="inputBox">
                            <InputLabel htmlFor="dateAssigned">Date Assigned:</InputLabel> 
                            <Input id="dateAssigned" name="dateAssigned" type="datetime-local" value={dateAssigned} onChange={e => setDateAssigned(e.target.value)}></Input>
                        </div>
                        <div className="inputBox">
                              <InputLabel htmlFor="dateDue">Date Due:</InputLabel> 
                              <Input id="dateDue" name="dateDue" type="datetime-local" value={dateDue} onChange={e => setDateDue(e.target.value)}></Input>
                        </div>
                      </Box>
                      <Box display="flex" justifyContent="center" className="textBox">
                          <div style={{ width: '600px' }}>
                                  <TextField 
                                  className="classes.textField"         
                                  id="filled-multiline-static"
                                  label="Homework"
                                  multiline
                                  rows={4}
                                  fullWidth
                                  defaultValue={question}
                                  variant="filled"
                                  onChange={e => setQuestion(e.target.value)}>
                                  </TextField>
                          </div>
                      </Box>
                      <Button variant="contained" type="submit">Add Assignment</Button>
                    </form>
          </div>
        </Box>
        )
      } else {
        return (
          <div>go home</div>
        )
      }
    }

export default NewHW 