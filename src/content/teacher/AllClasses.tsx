import React, {useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

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

const AllClasses : React.FC<PropsInt> = (props) => {

    let [classes, setclasses] = useState<ClassModel[]>([])
    let [classId, setClassId] = useState('')

    // Function to get all the classes offered by this teacher and display them
    const callApi =()=>{
        fetch(process.env.REACT_APP_SERVER_URL + 'classes')
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
            if(userStr == 'teacher'){
                callApi()
            }
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
            <Box>
                <div className="inputBox">
                    <Button variant="contained" value={cl._id} onClick={() => setClassId(`${cl._id}`)}>
                            {cl.classname}
                    </Button>
                </div>
            </Box>
        )
    })

    return(
        <div>
            <div>View All Classes</div>
            <div>
                <Button onClick={() => console.log({classId})}>Log it</Button>
                <Box display="flex" justifyContent="center">
                    {allClasses}
                </Box>
            </div>
        </div>
    )
}

export default AllClasses