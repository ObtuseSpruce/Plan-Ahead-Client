import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { EventInput } from '@fullcalendar/core'
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import Dialog from '@material-ui/core/Dialog';


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
  export interface homeworkModel {
    question:  string,
    dateDue: Date,
    dateAssigned: Date,
    teacher: string,
    students: Array<string>,
    class: string,
  }

interface eventModel {
    title: string,
    start: Date,
  //  url: string,
    end: Date
}

interface PropsInt {
    user: {
        firstName: string,
        position: string,
        _id: string
    }
}

const TeacherStudentCalendar: React.FC<PropsInt> = (props) => {
    let [homework, setHomework] = useState<homeworkModel[]>([])
    let [allClasses, setAllClasses] = useState<ClassModel[]>([])
    let [soloClassId, setSoloClassId] = useState('')
    let [hwEvents, setHwEvents] = useState<eventModel[]>([])
    let [message, setMessage] = useState('')
    let events: any = []

    useEffect(() => {
        const callClassApi =(url:string)=>{
            fetch(process.env.REACT_APP_SERVER_URL + 'classes' + url+ props.user._id)
            .then(response=> response.json())
            .then(data =>{
                console.log("classes data",data)
                 setAllClasses(data)
            })
            .catch(err=>{
                 console.log("error fetching classes in teacher calendar page",err)
            })
          }
          
          if(props.user ){
            let  userStr = props.user.position.toLowerCase()
            let url
            if(userStr == 'teacher') { url= '/teacher/' }
            else {  url = '/student/' }
            // call the api functions at component load
            callClassApi(url)
          }

    }, [])
    
    if(!props.user) {
        return <Redirect to='/login'/>
      }
   

      const callClassHW =(classid:string)=>{
        soloClassId = classid;
       // setSoloClassId(classid)
        console.log("ClassId ",classid)
        if(classid){
            fetch(process.env.REACT_APP_SERVER_URL + 'assignments/class/' + classid)
            .then(response=> response.json())
            .then(data =>{
                setHomework(data)
                console.log("HW ",data)
            })
            .catch(err=>{
                 console.log("error fetching assignemnets for a class in teacher calendar page",err)
            })
        }
    }
   


    // Called when the teacher clicks the log button and it display all the HWs for that class 
    let buttonHW = (e: any) => {
        if(!soloClassId){
            setMessage('Select the class before clicking the log button')
        }
        else{
            setMessage('')
        }
        e.preventDefault()
        homeworkMap()
    }

    const homeworkMap = () => {
     //   console.log(homework)
        let event: eventModel
        if(homework.length!== 0){
         events =   homework.map((hw,i)=>{
                event ={
                    title: hw.question,
                    start: hw.dateAssigned,
                   // url: 'https://www.google.com',
                    end: hw.dateDue
                }
                return event
            })
        }
        setHwEvents(events)
     //   console.log(events)
    }


    const refresh=()=>{
          setHomework([])
          setSoloClassId('')
          setHwEvents([])
    }

    const Calendar = () => {
       return(
                <div>
                    <FullCalendar
                    defaultView="dayGridMonth"
                    header={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay"
                    }}
                    selectable={true}
                    editable={false}
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    eventClick={ function(info) {
                        var eventObj = info.event;
                  
                        if (eventObj.url) {
                          alert(
                            'Clicked ' + eventObj.title + '.\n' +
                            'Will open ' + eventObj.url + ' in a new tab'
                          );
                  
                          window.open(eventObj.url);
                  
                          info.jsEvent.preventDefault(); // prevents browser from following link in current tab.
                        } else {
                          alert('Clicked ' + eventObj.title);
                        }
                      }}
                    events={hwEvents}
                     />
                </div>
            )
              
    }


        let classMap = allClasses.map((allc, i) => {
            return (
                <option value={allc._id}>{allc.classname}</option>
            )
        }) 

    return(
        <div>
              <span className="red">{message}</span>
            <div>
                <select name="class" value= {soloClassId} onChange={(e: any) => {
                    console.log("class name",e.target.value)
                    setSoloClassId(e.target.value)
                    let classid = e.target.value
                    callClassHW(classid)
                }}>
                 <option value="" selected>Select Class</option>
                {classMap}
                </select>
             {/*    <button onClick={getHomework}>class</button> */}
                <button onClick={buttonHW}>log</button>
                <button onClick={refresh}>Clear</button> 
            </div>
            <div className="inputField">
                <Calendar />
            </div>
        </div>
    )
}

export default TeacherStudentCalendar