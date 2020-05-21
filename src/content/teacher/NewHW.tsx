import React, {useEffect, useState} from 'react';


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
  classname:  string;
  subject:    string;
  teacher:   string;
  students:   Array<string>;
  assignments: Array<string>;
  startdate:  Date;
  enddate:    Date;
}

const NewHW : React.FC<{  }> = () =>{

    let [message, setMessage] =  React.useState<String | null>(null);

    //states for holding database information
    let [allClasses, setAllClasses] = React.useState<ClassModel[]>([])
    let [AllUsers, setAllUsers] = React.useState<StudentModel[]>([])


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
        fetch(process.env.REACT_APP_SERVER_URL + 'users')
        .then(response => response.json())
        .then(data => {
          setAllUsers(data)
        })
        .catch(err => {
          console.log("error fetching students", err)
        })
      }
      // call the api functions at component load
      callClassApi()
      callStudentApi()
    }, [])

    //map function for option tags
    let allClassOptions = allClasses.map((allc, i) => {
        return (
          <option value="allc._id">{allc.classname}</option>
        )
    })


   return(
          <div>
                 <h2>Create New Assignment</h2>
                <span className="red">{message}</span>
                {/* <form onSubmit={}>   */}
                    <form>
                    
                        <div>
                        <label>Classname:</label>
                          <select name="classname" id="classSelected">
                            {allClassOptions}
                          </select>
                        </div>
                      
                        <div>
                        <label>Students:</label>
                         {/* check box to select all students or few */}
                         </div>  

                        <div> 
                        <label>Date Assigned:</label>
                          {/* Assign todays date or later */}
                        </div>
                        
                        <div>
                        <label>Due Date:</label> 
                            {/* Assign todays date or later */} 
                        </div>
                         

                        <button type="submit">Add Assignment</button>
                    </form>
          </div>
        )
    }

export default NewHW 