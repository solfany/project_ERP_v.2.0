import React, { useState } from 'react';
import moment from 'moment';
import { message } from 'antd';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

import CustomButton from './../../../components/Button/CustomButton';
import 'moment/locale/ko';
import './calendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

moment.locale('ko');
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const allViews = Object.keys(Views).map((k) => Views[k]);

const MyCalendar = ({ isWhiteContent, events, setEvents }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = (event) => {
    setSelectedEvent({
      id: event.id,
      empNum: event.empNum,
      title: event.title,
      name: event.empName,
      start: event.start,
      end: event.end,
      desc: event.description,
    });
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const handleShowMore = () => {
    toggleModal();
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      axios
        .delete(`/api/calendarevents/delete/${selectedEvent.id}`)
        .then((response) => {
          // 삭제 성공 시, 이벤트 리스트 업데이트
          const updatedEvents = events.filter(
            (event) => event.id !== selectedEvent.id
          );
          setEvents(updatedEvents);
          setSelectedEvent(null); // 선택한 이벤트 초기화
          toggleModal();
          message.success('일정이 삭제되었습니다.');
        })
        .catch((error) => {
          message.error('일정을 삭제하는 도중 에러가 발생했습니다.');
          console.error('Error deleting event:', error);
        });
    }
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
        <ModalBody style={{ paddingTop: '30px' }}>
          {selectedEvent && (
            <Table hover bordered>
              <tbody>
                <tr>
                  <td>작성자</td>
                  <td colSpan={3}>{selectedEvent.name}</td>
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
