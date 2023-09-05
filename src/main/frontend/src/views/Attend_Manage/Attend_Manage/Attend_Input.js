import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  CButton, // CoreUI의 버튼 컴포넌트
  CSpinner, // 로딩 스피너 컴포넌트
} from '@coreui/react';
import Timer from './Timer';

function AttendanceButton() {
  const [attendanceStatus, setAttendanceStatus] = useState('');
  const [isRecording, setIsRecording] = useState(false); // 출석 기록 중 여부

  const staffInfo = JSON.parse(Cookies.get('staffInfo'));

  const handleAttendance = async () => {
    try {
      setIsRecording(true); // 출석 기록 중임을 나타내는 상태 변경

      const currentTime = new Date();

      let attendanceType = '';
      if (currentTime.getHours() >= 7 && currentTime.getHours() < 9) {
        attendanceType = '출근';
      } else if (currentTime.getHours() >= 9 && currentTime.getHours() < 11) {
        attendanceType = '지각';
      } else if (currentTime.getHours() >= 11 && currentTime.getHours() < 12) {
        attendanceType = '결근';
      }

      const response = await axios.post('/api/attendance', {
        staffInfo,
        attendanceType,
        attendanceTime: currentTime.toISOString(),
      });

      if (response.status === 200) {
        setAttendanceStatus(attendanceType);
      }
    } catch (error) {
      console.error('Error recording attendance:', error);
    } finally {
      setIsRecording(false); // 출석 기록 완료 후 상태 변경
    }
  };

  return (
    <div className="app-content attend-app-content">
      <Timer />
      <CButton
        color="primary" // CoreUI 버튼 컬러
        onClick={handleAttendance}
        disabled={isRecording} // 출석 기록 중에는 비활성화
      >
        {isRecording ? (
          <CSpinner size="sm" color="light" /> // 로딩 스피너 표시
        ) : (
          '출석'
        )}
      </CButton>
      <p>{attendanceStatus}</p>
    </div>
  );
}

export default AttendanceButton;
