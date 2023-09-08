import React, { useState } from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CBadge,
  CFormInput,
  CRow,
  CAlert,
  CCallout,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CDropdownItem,
  CDropdownDivider,
  CFormSelect,
} from "@coreui/react";
import css from "./css.css";
function CountWeekdays() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [weekdays, setWeekdays] = useState(0);
  const [workHours, setWorkHours] = useState(0); // 이 부분 추가

  const countWeekdaysInMonth = (year, month) => {
    let weekdays = 0;

    let date = new Date(year, month - 1, 1);
    let nextMonth = new Date(year, month, 1);

    while (date < nextMonth) {
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        weekdays++;
      }
      date.setDate(date.getDate() + 1);
    }
    return weekdays;
  };

  const calculateWorkHours = (weekdays) => {
    // 아래에서 8은 하루당 근무 시간을 나타냅니다.
    return weekdays * 8;
  };

  const handleSubmit = () => {
    const weekdaysCount = countWeekdaysInMonth(year, month);
    const workHours = calculateWorkHours(weekdaysCount);

    setWeekdays(weekdaysCount);
    setWorkHours(workHours);
  };

  // ... (이전 코드 생략)

  return (
    <CContainer className="zz">
      <CRow>
        <CCol md={3}>
          <label>Year: </label>
          <CFormInput
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </CCol>
        <CCol md={3}>
          <label>Month: </label>
          <CFormInput
            type="number"
            value={month}
            onChange={(e) => {
              const newMonth = parseInt(e.target.value, 10);
              if (newMonth > 12) {
                setMonth(1);
                setYear(year + 1);
              } else if (newMonth < 1) {
                setMonth(12);
                setYear(year - 1);
              } else {
                setMonth(newMonth);
              }
            }}
          />
        </CCol>

        <CCol md={2}>
          <br />
          <CButton onClick={handleSubmit}>Calculate Weekdays</CButton>
        </CCol>
      </CRow>
      <CCallout color="primary" className="zzzz">
        <CRow>
          <CCol md={3}>
            {year}년 {month}월의 평일 수: <b>{weekdays}</b>일
          </CCol>
          <CCol md={2}>
            소정근로일수: <b>{weekdays}</b>일{" "}
          </CCol>
          <CCol md={2}>
            소정근로시간: <b>{workHours}</b>시간
          </CCol>
        </CRow>
      </CCallout>
    </CContainer>
  );
}

export default CountWeekdays;
