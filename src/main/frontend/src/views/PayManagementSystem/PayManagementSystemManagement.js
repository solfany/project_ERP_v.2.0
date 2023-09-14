import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col, Button } from "reactstrap";
import GetThisMonth from "../TimeManagementSystem/CountWeekdays";
import Pdf from "./Pdf";
import { Pagination, message } from "antd";
import Cookies from "js-cookie";
import "./PayManagementSystemManagement.css";
import {
  CContainer,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
} from "@coreui/react";

function PayManagementSystemManagement() {
  const [rows, setRows] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const staffInfo = JSON.parse(Cookies.get("staffInfo"));

  useEffect(() => {
    fetch("/api/timeManagement")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  useEffect(() => {
    setRows(
      users.map((user) => [
        user.empNum,
        user.empName,
        0,
        user.vacation,
        user.actualWorkDays,
        user.workingHours,
        user.email,
        "no",
      ])
    );
  }, [users]);

  const tableColumns = [
    "사원번호",
    "이름",
    "무급휴가일수",
    "유급휴가일수",
    "실제근로일수",
    "실제근로시간",
    "이메일",
    "지급여부",
    "pdf 다운로드",
  ];

  const handlePayClick = (index) => {
    const confirmed = window.confirm("결제 완료 하시겠습니까?");
    if (confirmed) {
      alert("결제 완료되었습니다!");
      const newRows = [...rows];
      newRows[index][7] = "yes";
      setRows(newRows);
    } else {
      alert("취소 되었습니다.");
    }
  };

  const randum = (max) => Math.floor(Math.random() * max);
  const numbers = "0123456789";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let ran = "";
  for (let i = 0; i < 4; i++) {
    ran += numbers[randum(numbers.length)] + letters[randum(letters.length)];
  }

  const clickTobtn = () => {
    alert(`
    결제자: ${staffInfo.empName}
    결제 일시 : ${new Date()}
    관리자 코드: ${staffInfo.empNum}${ran}`);
  };

  //pdf 다운로드 로직
  const handleRowClick = (index) => {
    setSelectedRowIndex(index);
  };
  const someData = selectedRowIndex !== null ? users[selectedRowIndex] : null;

  return (
    <>
      <CContainer className="d-flex justify-content-around ">
        <Col md="12">
          <h2 className="calendarTitle">급여정산</h2>
          <GetThisMonth />
          <CTable striped bordered hover style={{ whiteSpace: "nowrap" }}>
            <CTableHead>
              <CTableRow>
                {tableColumns.map((column, index) => (
                  <CTableHeaderCell key={index}>{column}</CTableHeaderCell>
                ))}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {rows.map((row, rowIndex) => (
                <CTableRow
                  key={rowIndex}
                  onClick={() => handleRowClick(rowIndex)}
                >
                  {row.map((cell, cellIndex) => (
                    <CTableDataCell key={`${rowIndex}-${cellIndex}`}>
                      {cellIndex === 7 && cell === "no" && (
                        <Button
                          size="sm"
                          color="success"
                          onClick={() => handlePayClick(rowIndex)}
                        >
                          Pay
                        </Button>
                      )}
                      {cellIndex === 7 && cell === "yes" && (
                        <Button
                          size="sm"
                          color="secondary"
                          onClick={clickTobtn}
                        >
                          Paid
                        </Button>
                      )}
                      {cellIndex !== 7 && cell}
                    </CTableDataCell>
                  ))}

                  <CTableDataCell>
                    <Pdf userData={users[rowIndex]} />
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>{" "}
          </CTable>{" "}
          <Pagination className="payPagination" />
        </Col>
      </CContainer>
    </>
  );
}

export default PayManagementSystemManagement;
