import React, { useState } from 'react';
import initialEvents from './Calendar/events';
import './CalendarModal/modal.css';
import RunModal from './CalendarModal/RunModal';
import MyCalendar from './Calendar/MyCalendar';

function CalendarBoard() {
  const [events, setEvents] = useState(initialEvents);

  return (
    <div className="content">
      <div className="card" style={{ padding: '0 10px' }}>
        <div className="calendarHead">
          <h2 className="calendarTitle">근무일정 관리</h2>
          <div className="calendarBtnWrapper">
            <RunModal events={events} setEvents={setEvents}></RunModal>
          </div>
        </div>
        <MyCalendar events={events} setEvents={setEvents} />
      </div>
    </div>
  );
}

export default CalendarBoard;
