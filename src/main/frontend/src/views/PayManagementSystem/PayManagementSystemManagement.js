import React, { useState, useEffect } from "react";
import {
  Table,
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
// import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import EmployeeModal from "./EmployeeModal";
// 날짜
import GetThisMonth from "../TimeManagementSystem/getThisMonth";
function PayManagementSystemManagement() {
  const [rows, setRows] = useState([]);
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/solfany/Json_Group/main/json/project/002/user-list.json"
    )
      .then((response) => response.json())
      .then((json) => {
        setUsers(json);
      });
  }, []);

  useEffect(() => {
    setRows(
      users.map((user) => [
        user.rank,
        user.name,
        user.data5,
        user.data1,
        user.email,
        user.date,
        "no",
      ])
    );
  }, [users]);

  const tableColumns = [
    "사원번호",
    "이름",
    "유급휴가일수",
    "실제근로일수",
    "이메일",
    "입사일",
    "지급여부",
    "액션",
  ];

  const handlePayClick = (index) => {
    const confirmed = window.confirm("결제 완료 하시겠습니까?");
    if (confirmed) {
      alert("결제 완료되었습니다!");
      const newRows = [...rows];
      newRows[index][6] = "yes";
      setRows(newRows);
    } else {
      alert("취소 되었습니다.");
    }
  };

  const toggleModal = (user) => {
    setSelectedUser(user);
    setModal(!modal);
  };

  // 관리자 코드  랜덤 함수 추출
  const randum = (max) => Math.floor(Math.random() * max);
  const numbers = "0123456789";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let ran = "";
  for (let i = 0; i < 4; i++) {
    ran += numbers[randum(numbers.length)] + letters[randum(letters.length)];
  }

  const clickTobtn = () => {
    alert(`
    결제자: 관리자 (김아무개) 
    결제 일시 : 23년 4월 17일 오전 11시 23분
    관리자 코드: ${ran}`);
  };

  return (
    <>
      <div className="d-flex justify-content-around ">
        <Col md="12">
          <GetThisMonth />

          <Table>
            <thead>
              <tr>
                {tableColumns.map((column, index) => (
                  <th key={index}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`${rowIndex}-${cellIndex}`}
                      onClick={() => toggleModal(users[rowIndex])} // 테이블 칸 클릭 시 모달 열기
                      style={{ cursor: "pointer" }} // hover 효과를 주기 위해 cursor 속성 추가
                    >
                      {cellIndex === 6 && cell === "no" && (
                        <Button
                          size="sm"
                          color="success"
                          onClick={() => handlePayClick(rowIndex)}
                        >
                          Pay
                        </Button>
                      )}
                      {cellIndex === 6 && cell === "yes" && (
                        <Button
                          size="sm"
                          color="secondary"
                          onClick={clickTobtn}
                        >
                          Paid
                        </Button>
                      )}
                      {cellIndex !== 6 && cell}
                    </td>
                  ))}
                  <td>
                    <Button size="sm" color="primary">
                      메일로 전송
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {selectedUser && (
            <EmployeeModal
              isOpen={modal}
              toggle={toggleModal}
              user={selectedUser}
            />
          )}
        </Col>
      </div>
    </>
  );
}
export default PayManagementSystemManagement;
