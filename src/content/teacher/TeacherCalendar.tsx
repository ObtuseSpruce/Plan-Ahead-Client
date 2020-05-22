import React, {useState, useEffect} from 'react';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { EventInput } from '@fullcalendar/core'
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

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
    end: Date
}

interface PropsInt {
    user: {
        firstName: string,
        pic: string,
    }
    updateToken: (newToken: string | null) => void
}

const TeacherCalendar: React.FC<PropsInt> = (props) => {
    let [homework, setHomework] = useState<homeworkModel[]>([])
    let [allClasses, setAllClasses] = useState<ClassModel[]>([])
    let [soloClassId, setSoloClassId] = useState('')
    let [hwEvents, setHwEvents] = useState<eventModel[]>([])

    const callClassHW =()=>{
        fetch(process.env.REACT_APP_SERVER_URL + 'assignments/class/' + soloClassId)
        .then(response=> response.json())
        .then(data =>{
        setHomework(data)
        })
        .catch(err=>{
        console.log("error fetching classes",err)
        })
    }

    useEffect(() => {
        const callClassApi =()=>{
            fetch(process.env.REACT_APP_SERVER_URL + 'classes')
            .then(response=> response.json())
            .then(data =>{
            setAllClasses(data)
            })
            .catch(err=>{
            console.log("error fetching classes",err)
            })
          }
          callClassApi()
        //   setHwEvents([{title: "how many pears", start: '2020-05-19T12:30:00'}])

    }, [])
    
    let classMap = allClasses.map((allc, i) => {
        return (
            <option value={allc._id}>{allc.classname}</option>
        )
    })

    let getHomework = (e: any) => {
        e.preventDefault()
        callClassHW()
    }

    let buttonHW = (e: any) => {
        e.preventDefault()
        console.log(homework)
        homeworkMap()
        Calendar()
    }

    let events: any = []

    const homeworkMap = () => {
        setHwEvents([{title: homework[5].question, start: homework[5].dateAssigned, end: homework[5].dateDue}])
        console.log(events)
    }
    // const homeworkMap = homework.map((hw, i) => {
    //     setHwEvents(hwEvents + {title: hw.question, start: hw.dateAssigned})
    // })
    //     setHwEvents([{title: homework[5].question, start: homework[5].dateAssigned}])
    //     console.log(events)
    // }


    const Calendar = () => {
        // const events: EventInput[] = [{ title: "event 2 long",   start  : '2020-05-19T12:30:00' }];
    
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
                    events={hwEvents}
                     />
                </div>
            )
              
    }

    return(
        <div>

            <div>
                <select name="class" value= {soloClassId} onChange={(e: any) => {
                    console.log(e.target.value)
                    setSoloClassId(e.target.value)
                }}>
                {classMap}
                </select>
                <button onClick={getHomework}>class</button>
                <button onClick={buttonHW}>log</button>
            </div>

            <Calendar />

        </div>
    )
}

export default TeacherCalendar