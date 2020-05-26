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
import FrontTheme from '../content/pages/FrontTheme'
import { ThemeProvider } from '@material-ui/core/styles';

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

interface homeworkModel {
     _id: string; 
    question:  string;
    dateDue: Date;
    dateAssigned: Date;
    teacher: string;
    students: Array<string>;
    class: string;
  }

interface eventModel {
    title: string;
    start: Date;
    url: string;
    end: Date;
}

interface PropsInt {
    user: {
        firstName: string;
        position: string;
        _id: string;
    }
}

const useStyles = makeStyles({
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
  });



/**********************************************************************************************************
 TeacherStudentCalendar: This component renders a calendar which dynamically generates homework.
 for each class. 
 Functionalities:
 When the user selects a class and clicks on the log button, it shows all the homework for 
 that particular class on the calendar page. 
 When the user (teacher/student) clicks on the particular homework, a dialog box opens up showing the 
 questions on the homework and there is a link on the dialog box which takes you to a page where user can see
 all the details of that homework.
 **********************************************************************************************************/   
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
            // Function to retrieve all the classes for this user (student/teacher)
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
            if(userStr === 'teacher') { url= '/teacher/' }
            else {  url = '/student/' }
            // call the api function at component load and sending the specific url by recognising first if the user is a student or a teacher
            callClassApi(url)
          }
    }, [])
    
    // Visible to logged-in users as teachers and students
    if(!props.user) {
        return <Redirect to='/login'/>
    }
   
    // Function called when the user selects a particular class from the dropdown (select) menu
    const callClassHW =(classid:string)=>{
        soloClassId = classid;
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
   
    // Called when the user clicks the log button and it displays all the HWs for that class 
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

    // Every homework is mapped to a particular event on calendar 
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

    // Refreshes the calendar
    const refresh=()=>{
          setHomework([])
          setSoloClassId('')
          setHwEvents([])
    }

    // The Calendar component to be rendered on this component
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
    
    // Dialog box opens up when the event/homework on the calendar is clicked. 
    function SimpleDialog(props: any) {
            const classes = useStyles();
            const { onClose, selectedValue, open } = props;
            const handleClose = () => {
            onClose(selectedValue);
            }
            return (
                <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                    <List>
                        <div className="inputField">
                        <ListItem>
                            <div>
                                <p>{dialogContent}</p>
                            </div>
                        </ListItem>
                            <Button id="spaceButton" color="primary" variant="contained">
                                <a href={HwId}>view homework</a>
                            </Button>
                        </div>
                    </List>
                </Dialog>
                );
    }

    const handleClose = () => {
        setOpen(false);
        setDialogContent('')
        setHwId('')
    };


    let classMap = allClasses.map((allc, i) => {
        return (
            <MenuItem value={allc._id}>{allc.classname}</MenuItem>
        )
    }) 
  
    return(
    <ThemeProvider theme={FrontTheme}>
        <div>
            <span className="red">{message}</span>
            <div className="inputField">
            <InputLabel id="classname">Classname: </InputLabel>
                <Select defaultValue="true" name="class" value= {soloClassId}
                    onChange={(e: any) => {
                    console.log("class name",e.target.value)
                    setSoloClassId(e.target.value)
                    let classid = e.target.value
                    callClassHW(classid)
                }}>
                 <MenuItem value="" selected>Select Class</MenuItem>
                {classMap}
                </Select>
                <div>
                    <Button id="spaceButton" color="primary" variant="contained" onClick={buttonHW}>View Homework</Button>
        
                    <Button color="primary" variant="contained" onClick={refresh}>Clear</Button> 
                </div>
            </div>
            <div className="inputField">
                <Calendar />
            </div>
            <SimpleDialog open={open} onClose={handleClose} />
        </div>
    </ThemeProvider>
    )
}

export default TeacherStudentCalendar