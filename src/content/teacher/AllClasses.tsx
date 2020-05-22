import React, {useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'

interface PropsInt {
    user: {
        firstname: string,
        pic: string,
        position: string,
        _id: Object
    }
  }

interface ClassModel {
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
            <div>
                {cl.classname}
            </div>
        )
    })

    return(
        <div>
            <div>View All Classes</div>
            <div>
                {allClasses}
            </div>
        </div>
    )
}

export default AllClasses