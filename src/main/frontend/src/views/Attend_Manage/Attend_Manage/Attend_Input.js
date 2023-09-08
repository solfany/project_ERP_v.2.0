import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { CCardHeader } from '@coreui/react';
import Timer from './Timer';
import './Attend_Input.css';
import Attend_Records from './Attend_Record';
import Attend_Button from './Attend_Button';
import { message } from 'antd';

function Attend_Input() {
  const [attendanceTime, setAttendanceTime] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState('-');
  const [messageApi, contextHolder] = message.useMessage();

  message.config({
    top: 130, // 메시지가 나타날 위치 (상단으로부터의 거리)
    duration: 4, // 메시지가 보여질 시간 (초 단위)
    maxCount: 3, // 동시에 보여질 최대 메시지 수
    rtl: false, // RTL (오른쪽에서 왼쪽) 모드 활성화 여부
    prefixCls: 'my-message', // 커스텀 클래스명 프리픽스
  });

  // 컴포넌트가 마운트되면 출근 기록을 가져옴
  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  // 서버로 스태프 정보를 전송하고 해당 스태프의 출근 기록을 가져오는 함수
  const fetchAttendanceRecords = async () => {
    try {
      const staffInfo = JSON.parse(Cookies.get('staffInfo'));
      const response = await axios.post('/api/attendance/records', staffInfo);
      if (response.status === 200) {
        // 오늘의 출근 기록 필터링
        const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식으로 오늘의 날짜 가져오기
        const todayAttendanceRecords = response.data.filter(
          (record) => record.attendanceDate === today
        );

        const attendanceTimeValue = todayAttendanceRecords[0].attendanceTime;
        const attendanceTypeValue = todayAttendanceRecords[0].attendanceType;

        // 출근 시간을 시간대에 맞게 변환
        const [hour, minute, second] = attendanceTimeValue.split(':');

        let formattedHour = hour; // 시간을 그대로 저장
        console.log(attendanceTimeValue);
        if (parseInt(hour) >= 12) {
          if (hour !== '12') {
            formattedHour = String(parseInt(hour) - 12).padStart(2, '0'); // 12시 이후에는 12를 빼고 2자리 숫자로 표기
          }
          const formattedTime = `오후 ${formattedHour}:${minute}`;

          setAttendanceTime(formattedTime);
          setAttendanceStatus(attendanceTypeValue);
        } else {
          if (hour === '00') {
            formattedHour = '12'; // 00시는 12시로 표기
          }
          const formattedTime = `오전 ${formattedHour}:${minute}`;
          setAttendanceTime(formattedTime);
          setAttendanceStatus(attendanceTypeValue);
        }
        message.success('데이터를 성공적으로 갱신했습니다.');
      } else {
        setAttendanceStatus('-');
        // 에러 메시지를 화면에 표시
        message.error('출근 기록을 가져오는 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      // 에러 메시지를 화면에 표시
      message.error('출근 기록이 존재하지 않습니다.');
    }
  }, [time]);

  return (
    <div className="card">
      {contextHolder}
      <CCardHeader>
        <h2 className="attend-title">출결 입력</h2>
      </CCardHeader>
      <Timer />
      <Attend_Button
        attendanceTime={attendanceTime}
        setAttendanceTime={setAttendanceTime}
        attendanceStatus={attendanceStatus}
        setAttendanceStatus={setAttendanceStatus}
      />
    </div>
  );
}

export default Attend_Input;
