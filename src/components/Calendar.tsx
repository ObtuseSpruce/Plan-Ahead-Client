
import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { EventInput } from '@fullcalendar/core'
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

const Calendar : React.FC<{ props: any }> = props => {
    const events: EventInput[] = [{ title: "today's event", date: new Date() },
    { title: " event 1",   start  : '2020-05-19' },
    { title: "event 2 long",   start  : '2020-05-19T12:30:00' },
    { title: "event3",   start  : '2020-05-21T14:30:00' },
    { title: "event4",   start  : '2020-05-23T15:30:00' }
    ];

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
                editable={true}
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                events={events}
                 />
            </div>
        )
          
    }

export default Calendar