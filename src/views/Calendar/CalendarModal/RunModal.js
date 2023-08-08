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

function RunModal({ events, setEvents, className }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const sendData = (e) => {
    e.preventDefault();

    const name = e.target.elements.Name.value;
    const desc = e.target.elements.desc.value;
    const date = moment(startDate).format('YYYY-MM-DD');
    const endDay = moment(endDate).format('YYYY-MM-DD');
    const startTime = moment(selectedStartTime, 'HH:mm').format('HH:mm');
    const endTime = moment(selectedEndTime, 'HH:mm').format('HH:mm');

    // 필드가 모두 채워져 있는지 확인
    if (!name || !desc || !date || !startTime || !endTime || !endDay) {
      toggle();
      return message.error('모든 필드를 입력해주세요.');
    }

    // const showMessage = () => {
    //   message.config({
    //     top: 125, // 메시지가 나타날 위치 (상단으로부터의 거리)
    //     duration: 4, // 메시지가 보여질 시간 (초 단위)
    //     maxCount: 3, // 동시에 보여질 최대 메시지 수
    //     rtl: false, // RTL (오른쪽에서 왼쪽) 모드 활성화 여부
    //     prefixCls: 'my-message', // 커스텀 클래스명 프리픽스
    //   });
    // };

    const newEvent = {
      title: name + ' ' + desc,
      name: name,
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
      desc: desc,
    };

    setEvents([...events, newEvent]);
    toggle();

    return message.success(' 일정이 성공적으로 등록되었습니다. ');
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
        <ModalBody>
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
