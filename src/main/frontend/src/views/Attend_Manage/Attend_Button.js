import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  CCol,
  CRow, // CoreUI의 버튼 컴포넌트
  CWidgetStatsD, // 로딩 스피너 컴포넌트
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { CChartLine } from '@coreui/react-chartjs';
import { cilBell } from '@coreui/icons';
import { message } from 'antd';

// 현재시간
const currentTime = new Date();

// 시간을 HH:mm:ss 형식으로 형식화
const formattedTime = `${currentTime.getHours()}:${String(
  currentTime.getMinutes()
).padStart(2, '0')}:${String(currentTime.getSeconds()).padStart(2, '0')}`;

// "오후" 또는 "오전"을 붙이기
const amPm = currentTime.getHours() >= 12 ? '오후' : '오전';

// 최종 형식화된 시간
const formattedTimeString = `${amPm} ${formattedTime}`;

function Attend_Button({
  attendanceTime,
  setAttendanceTime,
  attendanceStatus,
  setAttendanceStatus,
}) {
  const staffInfo = JSON.parse(Cookies.get('staffInfo'));

  const handleAttendance = async () => {
    try {
      let attendanceType = '';

      if (
        amPm == '오전' &&
        currentTime.getHours() >= 7 &&
        currentTime.getHours() < 9
      ) {
        attendanceType = '출근';
      } else if (
        amPm == '오전' &&
        currentTime.getHours() >= 9 &&
        currentTime.getHours() < 12
      ) {
        attendanceType = '지각';
      } else if (
        amPm == '오후' &&
        currentTime.getHours() >= 12 &&
        currentTime.getHours() < 24
      ) {
        attendanceType = '결근';
      }

      currentTime.setHours(currentTime.getHours() + 9);

      const response = await axios.post('/api/attendance/new', {
        staffInfo,
        attendanceType,
        attendanceStr: currentTime, // ISO 형식의 문자열로 변환하여 전송
      });

      currentTime.setHours(currentTime.getHours() - 9);
      console.log(response);
      if (response.data.message === '이미 출근 기록이 존재합니다.') {
        message.error(response.data.message);
      } else if (response.data.message === '출근 기록이 완료되었습니다.') {
        // 출근 시작 시간을 현재 시간으로 설정
        setAttendanceStatus(attendanceType);
        setAttendanceTime(formattedTimeString);
        message.success(response.data.message);
      } else {
        message.info(response.data.message);
      }
    } catch (error) {
      console.error('Error recording attendance:', error);
    }
  };

  return (
    <>
      <CRow>
        <CCol xs={3}></CCol>
        <CCol xs={6} style={{ position: 'relative', paddingBottom: '40px' }}>
          <CWidgetStatsD
            className="mb-3"
            icon={
              <CIcon className="my-4 text-white" icon={cilBell} height={52} />
            }
            chart={
              <CChartLine
                className="position-absolute w-100 h-100"
                data={{
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                  ],
                  datasets: [
                    {
                      backgroundColor: 'rgba(255,255,255,.1)',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointHoverBackgroundColor: '#fff',
                      borderWidth: 2,
                      data: [1, 13, 9, 17, 34, 41, 38],
                      fill: true,
                    },
                  ],
                }}
                options={{
                  elements: {
                    line: {
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 4,
                      hoverBorderWidth: 3,
                    },
                  },
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      display: false,
                    },
                    y: {
                      display: false,
                    },
                  },
                }}
              />
            }
            style={{ '--cui-card-cap-bg': '#00aced' }}
            values={[
              {
                title: '출근시간',
                value: attendanceTime ? `${attendanceTime}` : '-',
              }, // 시, 분, 초를 개별적으로 출력,
              {
                title: '상태',
                value: attendanceStatus ? `${attendanceStatus}` : '-',
              },
            ]}
          ></CWidgetStatsD>
          <div className="attend-button-container">
            <button
              className="attend-button"
              color="primary" // CoreUI 버튼 컬러
              onClick={handleAttendance}
            ></button>
          </div>
        </CCol>
        <CCol xs={3}></CCol>
      </CRow>
    </>
  );
}
export default Attend_Button;
