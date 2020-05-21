import React, {useEffect, useState} from 'react';


interface ClassModel {
    classname:  string;
    subject:    string;
    teacher:   string;
    students:   Array<string>;
    assignments: Array<string>;
    startdate:  Date;
    enddate:    Date;
}

const AllClasses = () => {

    let [classes, setclasses] = useState<ClassModel[]>([])
    
    useEffect(() => {
        const callApi =()=>{
          fetch(process.env.REACT_APP_SERVER_URL + 'classes')
          .then(response=> response.json())
          .then(data =>{
          console.log(data)
          setclasses(data)
          })
          .catch(err=>{
          console.log("err",err)
          })
        }
        callApi()
      }, [])


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