import React, { useEffect, useState } from 'react';
// import initialEvents from './Calendar/events';
import './CalendarModal/modal.css';
import RunModal from './CalendarModal/RunModal';
import MyCalendar from './Calendar/MyCalendar';
import axios from 'axios';
import { message } from 'antd';

function CalendarBoard() {
  const [events, setEvents] = useState();
  const [messageApi, contextHolder] = message.useMessage();

  message.config({
    top: 130, // 메시지가 나타날 위치 (상단으로부터의 거리)
    duration: 4, // 메시지가 보여질 시간 (초 단위)
    maxCount: 3, // 동시에 보여질 최대 메시지 수
    rtl: false, // RTL (오른쪽에서 왼쪽) 모드 활성화 여부
    prefixCls: 'my-message', // 커스텀 클래스명 프리픽스
  });

  useEffect(() => {
    axios
      .get('/api/calendarevents')
      .then((response) => {
        setEvents(response.data);
        message.success('데이터를 성공적으로 갱신하였습니다.');
      })
      .catch((error) => {
        message.error('데이터를 갱신하는 도중 에러가 발생하였습니다.');
      });
  }, []);

  return (
    <div className="content light">
      {contextHolder}
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
