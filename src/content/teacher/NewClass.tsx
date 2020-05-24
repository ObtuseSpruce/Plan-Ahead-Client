import React,{ useState, FormEvent }  from 'react';
import {Redirect} from 'react-router-dom'
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

interface PropsInt {
    user: {
        firstname: string,
        position: string,
        _id: Object
    }
  }

const NewClass : React.FC<PropsInt> = (props) => {
    let [message, setMessage] =  useState('') 
    let [classname, setClassname] = useState('')
    let [teacher, setTeacher] = useState('')
    let [subject, setSubject] = useState('')
    let [startdate, setStartDate] = useState('')
    let [enddate, setEndDate] = useState('')

    if(!props.user) {
        return <Redirect to='/login'/>
       
      }

    let userStr = props.user.position.toLowerCase() 

     if(userStr !== "teacher"){
        return <Redirect to='/'/>
      }
      else {
        teacher = props.user._id.toString()
        }
      console.log("user ", props.user)

      const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
       
        console.log("data to send in new class: Teacher id", teacher)
        console.log("data to send in new class: Teacher classname", classname)
        console.log("data to send in new class: Teacher subject", subject)
        console.log("data to send in new class: Teacher startdate", startdate)
        console.log("data to send in new class: Teacher enddate", enddate)

        // This request add a new class for this teacher and sends the class data for this teacher to the server
        fetch(process.env.REACT_APP_SERVER_URL + 'classes', {
            method: 'POST',
            body: JSON.stringify({
                classname,
                subject,
                teacher,
                startdate,
                enddate
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
              setClassname('')
              setSubject('')
              setTeacher('')
              setStartDate('')
              setEndDate('')
              setMessage('')
            }) 
      }

   return(
        <Box display="flex" justifyContent="center">
          <div className="inputField">
               <h2>Create New Class</h2>
                <span className="red">{message}</span>
                   <form onSubmit={handleSubmit}>   
                   <Box display="flex" justifyContent="center" className="textBox">
                      <div className="inputBox">
                        <InputLabel htmlFor="classname">Classname:</InputLabel>
                        <Input id="classname" name="classname" value= {classname} onChange={e => setClassname(e.target.value)} /> 
                      </div>
                      <div className="inputBox">
                        <InputLabel>Subject:</InputLabel>
                        <Input name="subject" value= {subject} onChange={e => setSubject(e.target.value)}/> 
                      </div> 
                        <Input type="hidden" name="teacher"   value={teacher}/> 
                    </Box>
                    <Box display="flex" justifyContent="center" className="textBox">
                          <div className="inputBox">
                                <InputLabel>Start Date:</InputLabel>
                                <Input type="date" name="startdate" value={startdate} onChange={e => setStartDate(e.target.value)} />
                        </div>
                        <div className="inputBox">
                                <InputLabel>End Date:</InputLabel>
                                <Input type="date" name="enddate" value={enddate} onChange={e => setEndDate(e.target.value)} />
                        </div>
                    </Box>

                        <Button variant="contained" type="submit">Create Class</Button>
                     </form>
            </div>
          </Box>
      )
    }

export default NewClass 