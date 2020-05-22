import React, {useState, useEffect} from 'react';
import Calendar from '../../components/Calendar'

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
  interface homeworkModel {
    question:  string;
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

    const callClassHW =()=>{
        fetch(process.env.REACT_APP_SERVER_URL + 'assignments/classes/' + soloClassId)
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

    }, [])
    
    let classMap = allClasses.map((allc, i) => {
        return (
            <option value={allc._id}>{allc.classname}</option>
        )
    })

    let getHomework = () => {
        callClassHW()
    }

    let buttonHW = () => {
        console.log(homework)
    }


    const homeworkMap = () => {
        if(homework){
            let mappedHW = homework.map((hw, i) => {
                return (
                    <div>
                        {hw.question}
                    </div>
                )
            })
    }}

    return(
        <div>

            <div>
                <select name="class" value= {soloClassId} onChange={(e: any) => {
                    console.log(e.target.value)
                    setSoloClassId(e.target.value)
                    getHomework()
                }}>
                {classMap}
                </select>
            <button onClick={buttonHW}>click
            </button>
            </div>
            <div>
            </div>

            <Calendar />

        </div>
    )
}

export default TeacherCalendar