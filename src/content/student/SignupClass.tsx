import React, { useState, useEffect } from 'react';

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
    select?: boolean; 
    _id: Object; 
    classname:  string;
    subject:    string;
    teacher:   string;
    students?:   Array<string>;
    assignments?: Array<string>;
    startdate:  Date;
    enddate:    Date;
}


const SignupClass : React.FC<PropsInt> = (props) => {
    let [classes, setClasses] = useState<ClassModel[]>([])
    let [selectedClasses, setSelectedClasses]= useState<ClassModel[]>([])
    let [message, setMessage] = useState('')


    // Function to call the API and retrieve the classes
    const callApi =()=>{
        fetch(process.env.REACT_APP_SERVER_URL + 'classes')
        .then(response=> response.json())
        .then(data=>{ 
            let studentId = props.user._id
            fetch(process.env.REACT_APP_SERVER_URL + 'classes/student/'+studentId)
            .then(resp=> resp.json())
            .then(nestedData =>{
                console.log('nestedData: student signed classes ',nestedData)
                console.log('all classes ',data)
                let filteredClasses : Array<ClassModel> = []
                if(nestedData.length !== 0){
                    classes.forEach((cl)=>{
                        let status = true
                        nestedData.forEach((nd: ClassModel)=>{
                            if(cl._id == nd._id){
                                status = false
                            }
                        }) 
                        if(status){
                            filteredClasses.push(cl)
                        }           
                    }) 
                    setClasses(filteredClasses)
                    console.log("filteredClasses",filteredClasses)
                }
                else{
                    setClasses(data)
                }
                
            })

        })
        .catch(err=>{
        console.log("err",err)
        })
    }

    useEffect(() => {
        if(props.user ){
            let  userStr = props.user.position.toLowerCase()
            if(userStr !== 'teacher'){
                callApi()
            }
        }
      }, [])

    // Protect route to only students  
        if(!props.user) {
            return <Redirect to='/login'/>
         }
        let userStr = props.user.position.toLowerCase() 
        if(userStr == "teacher"){
            return <Redirect to='/profile'/>
        }
    
    // Creates table rows for classes    
    let allClasses =  classes.map((cl, i)=>{
        return (
                <tr key= {i}>
                    <th>
                            <input type="checkbox" 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
                            let checked = event.target.checked
                            let classesWithSelect = classes.map((c,i)=>{
                                    if(cl._id === c._id){
                                        c.select = checked 
                                        console.log("c.select",c.select)
                                        console.log("c",c)
                                    }
                                    return c
                                }).filter((c)=>{
                                    return c.select
                                })
                                setSelectedClasses(classesWithSelect)
                        }} 
                        checked={cl.select}></input>
                    </th> 
                    <td>{cl.classname} </td>
                    <td>{cl.subject}</td>
                    <td>{cl.startdate}</td>
                    <td>{cl.teacher}</td>
                    <td>{cl.enddate}</td>
                </tr>
        )    
    })
  
    // All the classes (in the form of class id) selected by student are sent to the server 
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        let  classes :Array<string>  = []
        classes = selectedClasses.map((cl,i)=>{
             return cl._id.toString()
        })
        console.log("class id selected",classes)
      
        fetch(process.env.REACT_APP_SERVER_URL + 'users/classes/'+props.user._id, {
            method: 'PUT',
            body: JSON.stringify({
                classes
            }),
            headers: {
                'Content-Type' : 'application/json'
            }
          }
        )
        .then(response => {
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
            console.log('error in signup class submit', err)
        })

        // TODO: Redirect to the page where user can see all the classes
    }

   return(
          <div>
                <h2>Sign Up for Class</h2>
                <span className="red">{message}</span>

                <div className="signUpTable">
                    <form onSubmit={handleSubmit}>
                          
                        <button type="submit">Register for Classes</button>
                    </form> 
                        <table>
                                <thead>
                                    <tr>
                                        <th>Select</th>
                                        <th>ClassName</th>
                                        <th>Subject</th>
                                        <th> Start Date</th>
                                        <th>Teacher</th>
                                        <th>End Date</th>
                                    </tr>
                                </thead>
                                <tbody> 
                                    {allClasses}
                                </tbody>
                        </table>
                </div>
          </div>
          )
    }

export default SignupClass 