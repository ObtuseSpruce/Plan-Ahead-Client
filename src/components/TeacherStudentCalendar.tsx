import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles({
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
  });


interface ClassModel {
    _id: string;
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
     _id: string, 
    question:  string,
    dateDue: Date,
    dateAssigned: Date,
    teacher: string,
    students: Array<string>,
    class: string
  }

interface eventModel {
    title: string,
    start: Date,
    url: string,
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
    let [dialogContent, setDialogContent] = useState('')
    let [HwId, setHwId] = useState('')
    let [open, setOpen] = useState(false);

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
        let event: eventModel
        if(homework.length!== 0){
         events =   homework.map((hw,i)=>{
                event ={
                    title: hw.question,
                    start: hw.dateAssigned,
                    url: '/viewhw/'+ hw._id,
                    end: hw.dateDue
                }
                return event
            })
        }
        setHwEvents(events)
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
                        info.jsEvent.preventDefault()
                        var eventObj = info.event;
                        console.log(eventObj.url)
                        setOpen(true)
                        setDialogContent(eventObj.title)
                        setHwId(eventObj.url)
                      }}
                    events={hwEvents}
                     />
                </div>
            )
              
    }


    let classMap = allClasses.map((allc, i) => {
        return (
            <MenuItem value={allc._id}>{allc.classname}</MenuItem>
        )
    }) 
  
    const handleClose = () => {
      setOpen(false);
      setDialogContent('')
      setHwId('')
    };

    function SimpleDialog(props: any) {
        const classes = useStyles();
        const { onClose, selectedValue, open } = props;
      
        const handleClose = () => {
          onClose(selectedValue);
        };
      
     
      
        return (
          <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <List>
                <div className="inputField">
                <ListItem>
                    <div>
                        <p>{dialogContent}</p>
                    </div>
                </ListItem>
                    <Button variant="contained">
                        <a href={HwId}>view homework</a>
                    </Button>
                </div>
            </List>
          </Dialog>
        );
      }

    return(
        <div>
            <span className="red">{message}</span>
            <div className="inputField">
            <InputLabel id="classname">Classname: </InputLabel>
                <Select defaultValue="true" name="class" value= {soloClassId} onChange={(e: any) => {
                    console.log("class name",e.target.value)
                    setSoloClassId(e.target.value)
                    let classid = e.target.value
                    callClassHW(classid)
                }}>
                 <MenuItem value="" selected>Select Class</MenuItem>
                {classMap}
                </Select>
             {/*    <button onClick={getHomework}>class</button> */}
                <div>
                    <Button variant="contained" onClick={buttonHW}>View Homework</Button>
        
                    <Button variant="contained" onClick={refresh}>Clear</Button> 
                </div>
            </div>
            <div className="inputField">
                <Calendar />
            </div>
            <SimpleDialog open={open} onClose={handleClose} />
        </div>
    )
}

export default TeacherStudentCalendar