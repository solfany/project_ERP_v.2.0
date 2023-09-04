// import React, { useState } from "react";
// import { Modal, ModalHeader, ModalBody, ModalFooter, Label } from "reactstrap";
// import axios from "axios";
// import { message } from "antd";

// function Vacation({ fetchVacationData }) {
//   const [modal, setModal] = useState(false);
//   const toggle = () => setModal(!modal);

//   const [empName, setEmpName] = useState("");
//   const [dept, setDept] = useState(""); // 수정된 부분
//   const [position, setPosition] = useState(""); // 수정된 부분
//   const [vacaType, setVacaType] = useState(""); // 수정된 부분
//   const [vacaStart, setVacaStart] = useState(new Date());
//   const [vacaEnd, setVacaEnd] = useState(new Date());
//   const [vacaEtc, setVacaEtc] = useState(0); // 초기값은 0으로 설정
//   //휴가 일수
//   const [vacaReason, setVacaReason] = useState(""); // 수정된 부분

//   useEffect(() => {
//     const startDate = new Date(vacaStart);
//     const endDate = new Date(vacaEnd);
//     const timeDiff = endDate - startDate;
//     const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
//     setVacaEtc(dayDiff);
//   }, [vacaStart, vacaEnd]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {

//       const vacationDto = {
//         empName,
//         dept,
//         position,
//         vacaType,
//         vacaStart,
//         vacaEnd,
//         vacaEtc,
//         //휴가 뺸거 etc
//         vacaReason,
//       };

//       if (
//         !empName ||
//         !dept ||
//         !position ||
//         !vacaType ||
//         !vacaStart ||
//         !vacaEnd ||
//         !vacaEtc ||
//         //etc
//         !vacaReason
//       ) {
//         return message.error("모두 입력하세요");
//       }

//       await axios.post("http://localhost:8888/api/vacation", vacationDto);

//       setEmpName("");
//       setDept("");
//       setPosition("");
//       setVacaType("");
//       setVacaStart(new Date());
//       setVacaEnd(new Date());
//       setVacaEtc(0);
//       //etc
//       setVacaReason("");

//       toggle();
//       fetchVacationData();
//     } catch (error) {
//       console.error("Error adding vacation request:", error);
//     }
//   };


import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Label } from "reactstrap";
import axios from "axios";
import { message } from "antd";

function Vacation({ fetchVacationData }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  // const [empNum, setEmpNum] = useState("");
  const [empName, setEmpName] = useState("");
  const [dept, setDept] = useState("");
  const [position, setPosition] = useState("");
  const [vacaType, setVacaType] = useState("");
  const [vacaStart, setVacaStart] = useState(new Date());
  const [vacaEnd, setVacaEnd] = useState(new Date());
  const [vacaEtc, setVacaEtc] = useState(0);
  const [vacaReason, setVacaReason] = useState("");

  // vacaStart 또는 vacaEnd가 변경될 때마다 vacaEtc를 다시 계산
  useEffect(() => {
    const startDate = new Date(vacaStart);
    const endDate = new Date(vacaEnd);
    const timeDiff = endDate - startDate;
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    setVacaEtc(dayDiff + "일");
  }, [vacaStart, vacaEnd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const vacationDto = {
        // empNum,
        empName,
        dept,
        position,
        vacaType,
        vacaStart,
        vacaEnd,
        vacaEtc,
        vacaReason,
      };

      if (
        // !empNum ||
        !empName ||
        !dept ||
        !position ||
        !vacaType ||
        !vacaStart ||
        !vacaEnd ||
        !vacaEtc ||
        !vacaReason
      ) {
        return message.error("모두 입력하세요");
      }

      await axios.post("http://localhost:8888/api/vacation", vacationDto);
      // setEmpNum("");
      setEmpName("");
      setDept("");
      setPosition("");
      setVacaType("");
      setVacaStart(new Date());
      setVacaEnd(new Date());
      setVacaReason("");
      setVacaEtc("");
      toggle();
      fetchVacationData();
    } catch (error) {
      console.error("Error adding vacation request:", error);
    }
  };
  return (
    <div>
      <button className="blue" onClick={toggle}>
        휴가 신청
      </button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <div>
            <h2>휴가 신청</h2>
          </div>
        </ModalHeader>
        <ModalBody>
          <div>
            <form onSubmit={handleSubmit}>
              <ul>
                {/* <li>
                  <Label style={{ width: "300px" }}>사원번호 : {empNum}</Label>
                </li> */}

                <li>
                  <Label style={{ width: "80px" }}>이름 : </Label>
                  <input
                    type="empName"
                    name="empName"
                    placeholder="이름을 입력하세요"
                    value={empName}
                    onChange={(e) => setEmpName(e.target.value)}
                  ></input>
                </li>

                <li>
                  <Label style={{ width: "80px" }}>부서 : </Label>
                  <select
                    name="dept"
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                  >
                    <option value="">부서를 고르세요</option>
                    <option value="개발팀">개발팀</option>
                    <option value="인사팀">인사팀</option>
                    <option value="경영팀">경영팀</option>
                    <option value="영업팀">영업팀</option>
                    <option value="회계팀">회계팀</option>
                  </select>
                </li>
                <li>
                  <Label style={{ width: "80px" }}>직무 : </Label>
                  <select
                    name="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  >
                    <option value="">직무를 고르세요</option>
                    <option value="부장">부장</option>
                    <option value="차장">차장</option>
                    <option value="과장">과장</option>
                    <option value="주임">주임</option>
                    <option value="사원">사원</option>
                    <option value="대리">대리</option>
                  </select>
                </li>
                <li>
                  <Label style={{ width: "80px" }}>휴가 종류 : </Label>
                  <select
                    name="vacaType"
                    value={vacaType}
                    onChange={(e) => setVacaType(e.target.value)}
                  >
                    <option value="">휴가 종류</option>
                    <option value="연차">연차 휴가</option>
                    <option value="특별 휴가">특별 휴가</option>
                    <option value="조퇴">조퇴</option>
                    <option value="기타">기타</option>
                  </select>
                </li>
                <li>
                  <Label style={{ width: "80px" }}>휴가 시작 : </Label>
                  <input
                    type="date"
                    name="dayStart"
                    value={vacaStart}
                    onChange={(e) => setVacaStart(e.target.value)}
                  ></input>
                </li>
                <li>
                  <Label style={{ width: "80px" }}>휴가 종료 : </Label>
                  <input
                    type="date"
                    name="dayEnd"
                    value={vacaEnd}
                    onChange={(e) => setVacaEnd(e.target.value)}
                  ></input>
                </li>

                {/* <li>
                  <Label style={{ width: "80px" }}>휴가 :</Label>
                  <p
                    name="vacaDay"
                    value={vacaDay}
                    onChange={(e) => setDayValue(e.target.value)}
                  ></p>
                </li>
                <li>
                  <Label style={{ width: "80px" }}>휴가 기간 :</Label>
                  <p
                    type="vacaEtc"
                    value={vacaEtc}
                    onChange={(e) => setVacaEtc(e.target.value)}
                  ></p>
                </li> */}

                <li style={{ display: "flex" }}>
                  <Label style={{ width: "300px" }}>
                    휴가 일수 : {vacaEtc}
                  </Label>
                  {/* <p></p> */}
                </li>

                {/* etc */}

                <li>
                  <Label style={{ width: "80px" }}>메모(사유)</Label>
                  <textarea
                    name="vacaReason"
                    value={vacaReason}
                    onChange={(e) => {
                      setVacaReason(e.target.value);
                    }}
                    style={{ width: "95%" }}
                    placeholder="휴가 사유를 입력하세요"
                  ></textarea>
                </li>
              </ul>
            </form>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="blue" type="submit" onClick={handleSubmit}>
            신청하기
          </button>
          <button className="red" onClick={toggle}>
            취소하기
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Vacation;
