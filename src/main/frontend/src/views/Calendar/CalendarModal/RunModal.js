import React, { useState } from 'react';
import CustomButton from './../../../components/Button/CustomButton';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/ko';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { message } from 'antd';
import axios from 'axios';

function RunModal({ events, setEvents, className }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const sendData = async (e) => {
    e.preventDefault();

    const name = e.target.elements.Name.value;
    const empNum = e.target.elements.empNum.value;
    const desc = e.target.elements.desc.value;
    const date = moment(startDate).format('YYYY-MM-DD');
    const endDay = moment(endDate).format('YYYY-MM-DD');
    const startTime = moment(selectedStartTime, 'HH:mm').format('HH:mm');
    const endTime = moment(selectedEndTime, 'HH:mm').format('HH:mm');

    // 필드가 모두 채워져 있는지 확인
    if (
      !name ||
      !empNum ||
      !desc ||
      !date ||
      !startTime ||
      !endTime ||
      !endDay
    ) {
      toggle();
      return message.error('모든 필드를 입력해주세요.');
    }

    const newEvent = {
      title: name + ' - ' + desc,
      empNum: empNum,
      empName: name,
      start: new Date(
        startDate.year(),
        startDate.month(),
        startDate.date(),
        selectedStartTime.hour(),
        selectedStartTime.minute()
      ),
      end: new Date(
        endDate.year(),
        endDate.month(),
        endDate.date(),
        selectedEndTime.hour(),
        selectedEndTime.minute()
      ),
      description: desc,
    };

    axios.get('/api/calendarevents').then((response) => {
      setEvents(response.data);
      message.success('데이터를 성공적으로 갱신하였습니다.');
    });

    try {
      const response = await axios.post('/api/calendarevents/add', newEvent);
      axios.get('/api/calendarevents').then((updatedEvents) => {
        setEvents(updatedEvents.data);
      });
      message.success(response.data);
      toggle();
    } catch (error) {
      if (error.response) {
        console.error('서버 에러 :', error.response.data);
      } else {
        console.error('요청 실패:', error.message);
      }
    }
  };

  return (
    <div>
      <CustomButton
        type="button"
        onClick={toggle}
        className="blue"
        text="일정추가하기"
      />

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>일정 작성</ModalHeader>
        <ModalBody style={{ paddingTop: '20px' }}>
          <form onSubmit={sendData}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="Name">이름</Label>
                  <Input
                    id="Name"
                    name="Name"
                    placeholder="작성자"
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="empNum">사원번호</Label>
                  <Input
                    id="empNum"
                    name="empNum"
                    placeholder="사원번호"
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="startDate">기간</Label>
                  <br />
                  <DatePicker.RangePicker
                    style={{
                      width: '450px',
                      borderColor: 'rgba(29, 37, 59, 0.5)',
                    }}
                    onChange={(dates) => {
                      setStartDate(dates[0]);
                      setEndDate(dates[1]);
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="startTime">시간</Label>
                  <br />
                  <TimePicker.RangePicker
                    style={{
                      width: '450px',
                      borderColor: 'rgba(29, 37, 59, 0.5)',
                    }}
                    format="HH:mm"
                    onChange={(times) => {
                      setSelectedStartTime(times[0]);
                      setSelectedEndTime(times[1]);
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="desc">내용</Label>
                  <Input
                    id="desc"
                    type="textarea"
                    name="desc"
                    placeholder="내용을 기술해주세요."
                  />
                </FormGroup>
              </Col>
            </Row>
            <ModalFooter>
              <CustomButton type="submit" text="저장하기" className="blue" />
              <CustomButton
                type="button"
                onClick={toggle}
                text="취소"
                className="normal"
              />
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default RunModal;
