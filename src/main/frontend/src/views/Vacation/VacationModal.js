// import React, { useState, useEffect } from "react";
// import "./Map.css";
// import { Modal, ModalHeader, ModalBody, ModalFooter, Label } from "reactstrap";
// import { message } from "antd";

// //axios 추가
// import axios from "axios";

// // 모달창
// function Vacation() {
//   // const VacationTool = () => {
//   //vacation.js파일이에서 data,setData에 관련된 객체를 모두 사용할 수  있도록 propts로 불러옴

//   //하위 newData 같은 경우에 return에서  onchange된 value값을 받아
//   // ...data 즉 data에 대한 모든 기록?에 추가하고 setdata로 변환해서 보여주는 용도 인듯함

//   // 모달창 토글 방식
//   const [modal, setModal] = useState(false);
//   const toggle = () => setModal(!modal);

//   //모달 선택창
//   const [empName, setEmpName] = useState(""); //이름
//   const [dept, setTeamNameOptionValue] = useState(""); //부서
//   const [position, setPositionValue] = useState(""); //직급
//   const [vacaType, setVacationTypeValue] = useState(""); //휴가 종류
//   const [vacaDay, setDayValue] = useState(""); //휴가 일수 = 휴가 끝나는 일자 - 시작일자
//   const [vacaStart, setVacationStartValue] = useState(new Date()); //휴가 시작 일자
//   const [vacaEnd, setVacationEndValue] = useState(new Date()); //휴가 종료 일자
//   const [vacaEtc, setVacaEtc] = useState(""); //휴가기간 string
//   const [vacaReason, setReasonValue] = useState(""); //휴가 사유

//   //초기값 설정
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const vacationDto = {
//         // member, // 솔직히 왜 있는지 모르겟음 왜있냐

//         //empNum, //사원 번호

//         empName, //이름

//         dept, //부서

//         position, //직급

//         vacaType, //휴가 종류 - vacaType

//         vacaDay, //휴가 기간 = 휴가 종료일(vacaEnd) - 휴가 시작일(vacaStart)

//         vacaStart, //휴가 시작일 - vacaStart

//         vacaEnd, //휴가 종료일 - vacaEnd

//         vacaEtc, //휴가 기간을 int형으로 바꿔 일수를 구하는 것

//         vacaReason, //휴가 사유 - vacaReason
//       };
//       if (
//         !empName ||
//         !dept ||
//         !position ||
//         !vacaType ||
//         !vacaStart ||
//         !vacaEnd ||
//         !vacaDay ||
//         !vacaEtc ||
//         !vacaReason
//       ) {
//         return message.error("모두입력하세요");
//       }

//       await axios.post("http://localhost:8888/api/vacation", vacationDto);
//       //setEmpNum("");
//       setEmpName("");
//       setDept("");
//       setPosition("");
//       setVacaType("");
//       setVacaDay("");
//       setVacaStart(new Date());
//       setVacaEnd(new Date());
//       setVacaEtc("");
//       setVacaReason("");
//       fetchVacation();
//       // setShowModal(false); // Hide the modal after successful submission
//       toggle(); // 모달 닫기
//     } catch (error) {
//       console.error("Error adding staffs:", error);
//     }
//   };

//   return (
//     <div>
//       <button className="blue" onClick={toggle}>
//         휴가 신청
//       </button>
//       <Modal isOpen={modal} toggle={toggle}>
//         <ModalHeader toggle={toggle}>
//           <div>
//             <h2>휴가 신청</h2>
//           </div>
//         </ModalHeader>
//         <ModalBody>
//           <div>
//             <form onSubmit={handleSubmit}>
//               <ul>
//                 <li>
//                   <Label style={{ width: "80px" }}>이름 : </Label>
//                   <input
//                     type="empName"
//                     name="empName"
//                     placeholder="이름을 입력하세요"
//                     value={empName}
//                     onChange={(e) => setEmpName(e.target.value)}
//                   ></input>
//                 </li>
//                 <li>
//                   <Label style={{ width: "80px" }}>부서 : </Label>
//                   <select
//                     name="teamName"
//                     value={dept}
//                     onChange={(e) => setTeamNameOptionValue(e.target.value)}
//                   >
//                     <option value="">부서를 고르세요</option>
//                     <option value="개발팀">개발팀</option>
//                     <option value="인사팀">인사팀</option>
//                     <option value="경영팀">경영팀</option>
//                     <option value="영업팀">영업팀</option>
//                     <option value="회계팀">회계팀</option>
//                   </select>
//                 </li>
//                 <li>
//                   <Label style={{ width: "80px" }}>직무 : </Label>
//                   <select
//                     name="position"
//                     value={position}
//                     onChange={(e) => setPositionValue(e.target.value)}
//                   >
//                     <option value="">직무를 고르세요</option>
//                     <option value="부장">부장</option>
//                     <option value="차장">차장</option>
//                     <option value="과장">과장</option>
//                     <option value="대리">대리</option>
//                     <option value="주임">주임</option>
//                     <option value="사원">사원</option>
//                   </select>
//                 </li>
//                 <li>
//                   <Label style={{ width: "80px" }}>휴가 종류 : </Label>
//                   <select
//                     name="vacaType"
//                     value={vacaType}
//                     onChange={(e) => setVacationTypeValue(e.target.value)}
//                   >
//                     <option value="">휴가 종류</option>
//                     <option value="연차">연차 휴가</option>
//                     <option value="특별 휴가">특별 휴가</option>
//                     <option value="조퇴">조퇴</option>
//                     <option value="기타">기타</option>
//                   </select>
//                 </li>
//                 <li>
//                   <Label style={{ width: "80px" }}>날짜 입력 :</Label>
//                   <input
//                     type="dayStart"
//                     name="dayStart"
//                     value={vacaStart}
//                     onChange={(e) => setVacationStartValue(e.target.value)}
//                   ></input>
//                   <input
//                     type="dayEnd"
//                     name="dayEnd"
//                     value={vacaEnd}
//                     onChange={(e) => setVacationEndValue(e.target.value)}
//                   ></input>
//                 </li>

//                 <li>
//                   <Label style={{ width: "80px" }}>휴가 :</Label>
//                   <p
//                     name="vacaDay"
//                     value={vacaDay}
//                     onChange={(e) => setDayValue(e.target.value)}
//                   ></p>
//                 </li>
//                 <li>
//                   <Label style={{ width: "80px" }}>휴가 기간 :</Label>
//                   <p
//                     type="vacaEtc"
//                     value={vacaEtc}
//                     onChange={(e) => setVacaEtc(e.target.value)}
//                   ></p>
//                   {/* <option value="">휴가 기간</option>
//                     <option value="휴가 기간 조회">휴가 기간 조회</option> */}
//                   {/* <option value="오후">오후</option> */}
//                 </li>
//                 <li>
//                   <label style={{ width: "80px" }}>메모(사유)</label>
//                   <textarea
//                     name="vacaReason"
//                     value={vacaReason}
//                     onChange={(e) => {
//                       setReasonValue(e.target.value);
//                     }}
//                     style={{ width: "95%" }}
//                     placeholder="내용을 입력하세요"
//                   ></textarea>
//                   <ModalFooter>
//                     <button className="blue" type="submit" onClick={toggle}>
//                       신청하기
//                     </button>
//                     <button className="red" onClick={toggle}>
//                       취소하기
//                     </button>
//                   </ModalFooter>
//                 </li>
//               </ul>
//             </form>
//           </div>
//         </ModalBody>
//       </Modal>
//     </div>
//   );
// }

// export default Vacation;
import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Label } from "reactstrap";
import axios from "axios";
import { message } from "antd";

function Vacation({ fetchVacationData }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [empName, setEmpName] = useState("");
  const [dept, setDept] = useState(""); // 수정된 부분
  const [position, setPosition] = useState(""); // 수정된 부분
  const [vacaType, setVacaType] = useState(""); // 수정된 부분
  const [vacaStart, setVacaStart] = useState(new Date());
  const [vacaEnd, setVacaEnd] = useState(new Date());
  const [vacaReason, setVacaReason] = useState(""); // 수정된 부분

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const vacationDto = {
        empName,
        dept,
        position,
        vacaType,
        vacaStart,
        vacaEnd,
        vacaReason,
      };

      if (
        !empName ||
        !dept ||
        !position ||
        !vacaType ||
        !vacaStart ||
        !vacaEnd ||
        !vacaReason
      ) {
        return message.error("모두 입력하세요");
      }

      await axios.post("http://localhost:8888/api/vacation", vacationDto);

      setEmpName("");
      setDept("");
      setPosition(""); 
      setVacaType(""); 
      setVacaStart(new Date());
      setVacaEnd(new Date());
      setVacaReason("");

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
                  <Label style={{ width: "80px" }}>휴가 시작 :</Label>
                  <input
                    type="date"
                    name="dayStart"
                    value={vacaStart}
                    onChange={(e) => setVacaStart(e.target.value)}
                  ></input>
                </li>
                <li>
                  <Label style={{ width: "80px" }}>휴가 종료:</Label>
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
                <li>
                  <label style={{ width: "80px" }}>메모(사유)</label>
                  <textarea
                    name="vacaReason"
                    value={vacaReason}
                    onChange={(e) => {
                      setVacaReason(e.target.value);
                    }}
                    style={{ width: "95%" }}
                    placeholder="내용을 입력하세요"
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
