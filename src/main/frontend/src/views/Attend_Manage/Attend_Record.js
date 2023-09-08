import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Table } from 'antd';
import { CCardHeader, CCol, CRow } from '@coreui/react';
import './Attend_Input.css';

function Attend_Record() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const staffInfo = JSON.parse(Cookies.get('staffInfo'));

  // 서버로 스태프 정보를 전송하고 해당 스태프의 출근 기록을 가져오는 함수
  const fetchAttendanceRecords = async () => {
    try {
      const response = await axios.post('/api/attendance/records', staffInfo);
      const fetchedRecords = response.data;

      const formattedRecords = fetchedRecords.map((record) => ({
        date: record.attendanceDate,
        time: formatTime(record.attendanceTime),
        attendanceType: record.attendanceType,
      }));

      setAttendanceRecords(formattedRecords);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
    }
  };

  // 시간을 "오후 HH:mm" 형식으로 포맷하는 함수
  const formatTime = (timeString) => {
    const time = new Date(`1970-01-01T${timeString}`);
    const hours = time.getHours();
    const minutes = time.getMinutes();

    const period = hours >= 12 ? '오후' : '오전';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${period} ${formattedHours}:${formattedMinutes}`;
  };

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  const columns = [
    {
      key: 'date',
      title: '날짜',
      dataIndex: 'date',
    },
    {
      key: 'time',
      title: '시간',
      dataIndex: 'time',
    },
    {
      key: 'attendanceType',
      title: '출근 유형',
      dataIndex: 'attendanceType',
    },
  ];

  return (
    <div className="card">
      <CCardHeader>
        <h2 className="attend-title">출결 기록</h2>
      </CCardHeader>
      <CRow xs={{ gutter: 2 }}>
        <CCol xs={3}></CCol>
        <CCol xs={6}>
          <Table
            className="attend-table"
            style={{ marginTop: '20px' }}
            columns={columns}
            dataSource={attendanceRecords}
          />
        </CCol>
        <CCol xs={3}></CCol>
      </CRow>
    </div>
  );
}

export default Attend_Record;
