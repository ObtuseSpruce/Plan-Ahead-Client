import React from 'react';
import Calendar from '../../components/Calendar'

interface PropsInt {
    user: {
        firstName: string,
        pic: string,
    }
    updateToken: (newToken: string | null) => void
}

const TeacherCalendar: React.FC<PropsInt> = (props) => {
    return(
        <div>
            <Calendar />
        </div>
    )
}

export default TeacherCalendar