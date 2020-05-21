import React, {useEffect, useState, FormEvent} from 'react';
import moment from 'moment'


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
      pic: string,
      position: string,
      _id: string
  }
}

const NewHW : React.FC<PropsInt> = (props) =>{

  

    let [message, setMessage] =  React.useState<String | null>(null);
    //states for holding database information
    let [allClasses, setAllClasses] = React.useState<ClassModel[]>([])
    let [allUsers, setAllUsers] = React.useState<StudentModel[]>([])
    let [classId, setClass] =  useState('') 
    let [teacher, setTeacher] = useState('')
    let [question, setQuestion] = useState('')
    let [dateAssigned, setDateAssigned] = useState('')
    let [dateDue, setDateDue] = useState('')
    let [students, setStudent] = useState('')
    

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

      // calls the database to get all Students
      const callStudentApi = () => {
        fetch(process.env.REACT_APP_SERVER_URL + 'users/students')
        .then(response => response.json())
        .then(data => {
          console.log("student data", data)
          setAllUsers(data)
        })
        .catch(err => {
          console.log("error fetching students", err)
        })
      }
      // call the api functions at component load
      callClassApi()
      callStudentApi()

      setTeacher(props.user._id)
    }, [])

    
    //map function for option tags
    let allClassOptions = allClasses.map((allc, i) => {
        return (
            <option value={allc._id}>{allc.classname}</option>
        )
    })

    let studentMap = allUsers.map((allu, i) => {
        console.log("student id: ", allu._id)
        return (
          <option value={allu._id}>{allu.firstname}</option>
          )
    })


    const testSubmit = (e: FormEvent) => {
      e.preventDefault()
      console.log("teacher: ",  teacher)
      console.log("students: ",  students)
      console.log("question: ",  question)

      // let postObject = {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     classId,
      //     question,
      //     dateDue,
      //     dateAssigned,
      //     teacher,
      //     students,
      //   })
      // }
    }

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault()
      
      console.log("teacher: ",  teacher)
      console.log("students: ",  students)
      console.log("question: ",  question)


      fetch(process.env.REACT_APP_SERVER_URL + 'assignments/class/' + classId, {
        method: 'POST',
        body: JSON.stringify({
          question,
          dateDue,
          dateAssigned,
          teacher,
          students,
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
  }

   return(
          <div>
                 <h2>Create New Assignment</h2>
                <span className="red">{message}</span>
                    <form onSubmit={handleSubmit}>    {/* @todo   */}
                        <div>
                        <label>Classname:</label>
                          <select name="class" value= {classId} onChange={(e: any) => {
                            setTeacher(props.user._id)
                            setClass(e.target.value)} }>
                            {allClassOptions}
                            <option value="null">Another Class</option>
                          </select>
                        </div>

                        <div>
                          <input type="hidden" name="teacher" value={teacher}></input>
                        </div>

                        <div>
                        <label>Student: </label>
                        <select name="students" onChange={(e: any) => {
                          setStudent(e.target.value)} }>
                            {studentMap}
                        </select>
                        </div>

                        <div> 
                        <label>Date Assigned:</label>
                          <input name="dateAssigned" type="date" value={dateAssigned} onChange={e => setDateAssigned(e.target.value)}></input>
                        </div>
                        
                        <div>
                        <label>Due Date:</label> 
                          <input name="dateDue" type="date" value={dateDue} onChange={e => setDateDue(e.target.value)}></input>
                        </div>

                        <div>
                        <label>Question</label> 
                          <input name="question" type="text" value={question} onChange={e => {
                            setQuestion(e.target.value)
                          }}></input>
                        </div>
                         
                        <button type="submit">Add Assignment</button>
                    </form>
          </div>
        )
    }

export default NewHW 