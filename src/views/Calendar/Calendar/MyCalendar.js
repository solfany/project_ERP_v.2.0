import React, { useState } from 'react';
import moment from 'moment';
import { message } from 'antd';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

import CustomButton from './../../../components/Button/CustomButton';
import 'moment/locale/ko';
import './calendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('ko');
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const allViews = Object.keys(Views).map((k) => Views[k]);

const MyCalendar = ({ isWhiteContent, events, setEvents }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSelectEvent = (event) => {
    setSelectedEvent({
      title: event.title,
      name: event.name,
      start: event.start,
      end: event.end,
      desc: event.desc,
    });
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const handleShowMore = () => {
    toggleModal();
  };

  const showMessage = () => {
    message.config({
      top: 125, // 메시지가 나타날 위치 (상단으로부터의 거리)
      duration: 4, // 메시지가 보여질 시간 (초 단위)
      maxCount: 3, // 동시에 보여질 최대 메시지 수
      rtl: false, // RTL (오른쪽에서 왼쪽) 모드 활성화 여부
      prefixCls: 'my-message', // 커스텀 클래스명 프리픽스
    });

    message.error(' 일정이 성공적으로 삭제되었습니다. ');
  };

  const handleDeleteEvent = () => {
    const index = events.findIndex(
      (event) =>
        event.title === selectedEvent.title &&
        event.start === selectedEvent.start
    );
    const newEvents = [...events];
    newEvents.splice(index, 1);
    setEvents(newEvents);
    toggleModal();
    showMessage();
  };

  return (
    <div className="content">
      <div className="card">
        <div
          className={`calendar calendar-${
            isWhiteContent ? 'themeIsWhite' : 'themeIsBlack'
          }`}
          style={{ height: '700px' }}
        >
          {contextHolder}
          <Calendar
            events={events}
            localizer={localizer}
            step={60}
            views={allViews}
            defaultDate={new Date()}
            onSelectEvent={handleSelectEvent}
            onShowMore={handleShowMore}
          />
        </div>
      </div>
      <Modal isOpen={showModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>일정</ModalHeader>
        <ModalBody>
          {selectedEvent && (
            <Table hover bordered>
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>작성자</td>
                  <td>{selectedEvent.name}</td>
                </tr>
                <tr>
                  <td>시작날짜</td>
                  <td>{moment(selectedEvent.start).format('LL')}</td>
                  <td>종료날짜</td>
                  <td>{moment(selectedEvent.end).format('LL')}</td>
                </tr>

                <tr>
                  <td>시작시간</td>
                  <td>{moment(selectedEvent.start).format('LT')}</td>
                  <td>종료시간</td>
                  <td>{moment(selectedEvent.end).format('LT')}</td>
                </tr>
                <tr></tr>
                <tr>
                  <td>내용</td>
                  <td colSpan={3}>{selectedEvent.desc}</td>
                </tr>
              </tbody>
            </Table>
          )}
        </ModalBody>
        <ModalFooter>
          <div>
            <CustomButton
              color="danger"
              onClick={handleDeleteEvent}
              text="삭제"
              className="red"
            />
            <CustomButton
              color="info"
              onClick={toggleModal}
              className="normal"
              text="확인"
            />
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default MyCalendar;
