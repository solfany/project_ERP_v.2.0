import React, { useState } from "react";
import "./Map.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Label } from "reactstrap";
import { message } from "antd";

//axios 추가
import axios from "axios";

// 모달창
function Vacation({ data, setData }) {
  //vacation.js파일이에서 data,setData에 관련된 객체를 모두 사용할 수  있도록 propts로 불러옴

  //하위 newData 같은 경우에 return에서  onchange된 value값을 받아
  // ...data 즉 data에 대한 모든 기록?에 추가하고 setdata로 변환해서 보여주는 용도 인듯함

  //calendermodel 준이 보기

  // 모달창 토글 방식
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  //모달 선택창
  const [userId, setUserId] = useState("");
  const onChangeUserId = (e) => {
    setUserId(e.target.value);
  };
  const [teamNameOptionValue, setTeamNameOptionValue] = useState("");
  const [positionValue, setPositionValue] = useState("");
  const [vacationTypeValue, setVacationTypeValue] = useState("");
  const [dayValue, setDayValue] = useState("");
  const [reasonValue, setReasonValue] = useState("");
  const [vacationStartValue, setVacationStartValue] = useState(new Date());
  const [vacationEndValue, setVacationEndValue] = useState(new Date());

  // console.log(
  //   (new Date()),
  //   (new Date(vacationEndValue) - new Date(vacationStartValue)) /
  //     (1000 * 60 * 60 * 24)
  // );

  //초기값 설정
  const handleSubmit = async (e) => {
    e.preventDefault();

    const vacaEmpName = e.target.elements.Name.value; //사원번호
    const vacaName = e.target.elements.empName.value; //이름
    const vacaDept = e.target.elements.dept.value; //부서명
    const vacaPosition = e.target.elements.position.value; //직무
    const vacationType = e.target.elements.vacationType.value; //휴가 종류
    const vacaDay =
      (new Date(vacationEndValue) - new Date(vacationStartValue)) /
        (1000 * 60 * 60 * 24) +
      ` 일 `; //휴가 일수
    const vacaEtc = vacationStartValue + ` ~ ` + vacationEndValue; // 휴가 기간
    const vacaReason = e.target.elements.reason.value; //사유

    //vacaName('')

    setUserId("");
    setTeamNameOptionValue("");
    setPositionValue("");
    setVacationTypeValue("");
    setDayValue("");
    setVacationStartValue(new Date());
    setVacationEndValue(new Date());
    setReasonValue("");

    if (
      !userId ||
      !teamNameOptionValue ||
      !positionValue ||
      !vacationTypeValue ||
      !dayValue ||
      !reasonValue ||
      !vacationStartValue ||
      !vacationEndValue
    ) {
      toggle();
      return message.error("모두입력하세요");
    }

    // const newData = {
    //   code: '사원번호',
    //   name: e.target.elements.Name.value, //이름
    //   teamName: e.target.elements.teamName.value, //부서명
    //   position: e.target.elements.position.value, //직무
    //   vacationType: e.target.elements.vacationType.value, //휴가 종류
    //   day:
    //     (new Date(vacationEndValue) - new Date(vacationStartValue)) / (1000 * 60 * 60 * 24) +
    //     ` 일 `, //휴가 일수
    //   etc: vacationStartValue + ` ~ ` + vacationEndValue, // 휴가 기간
    //   reason: e.target.elements.reason.value, //사유
    // }

    //아마도 이 데이터 값이
    const newData = {
      empNum: e.target.elements.empNum.value, //사원번호
      //사원번호는 입력하지 않고도 이름이나 fk값을 받아 자동으로 찾을 수 있어야함
      name: e.target.elements.empName.value, //이름
      teamName: e.target.elements.dept.value, //부서명
      position: e.target.elements.position.value, //직무
      vacationType: e.target.elements.vacationType.value, //휴가 종류
      day:
        (new Date(vacationEndValue) - new Date(vacationStartValue)) /
          (1000 * 60 * 60 * 24) +
        ` 일 `, //휴가 일수
      etc: vacationStartValue + ` ~ ` + vacationEndValue, // 휴가 기간
      reason: e.target.elements.reason.value, //사유
    };
    setData([...data, newData]);
    // console.log(data);
    // console.log(newData);

    //보내기

    //   const response = await axios.post('/api/Vacation/add', newEvent);

    //   // newEvent 를 반영한 데이터베이스를 가져오기 위해 events 갱신
    //   axios.get('/api/Vacation')
    //   .then(updatedEvents => { setEvents(updatedEvents.data)})

    //   message.success(response.data);
    //   toggle();
    // } catch (error) {
    //   console.error(error);
    //   if (error.response) {
    //     // 서버에서 에러 응답을 보낸 경우
    //     console.error("Server error response:", error.response.data);
    //   } else {
    //     // 요청 자체가 실패한 경우
    //     console.error("Request failed:", error.message);
    //   }
    // }
  };

  return (
    <div>
      <button className="blue" onClick={toggle}>
        휴가 신청
      </button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <h2>휴가 신청</h2>
        </ModalHeader>
        <ModalBody>
          <div>
            <form onSubmit={handleSubmit}>
              <ul>
                <li>
                  <Label style={{ width: "80px" }}>이름 : </Label>
                  <input
                    type="Name"
                    name="Name"
                    placeholder="이름을 입력하세요"
                    value={userId}
                    onChange={onChangeUserId}
                  ></input>
                </li>
                <li>
                  <Label style={{ width: "80px" }}>부서 : </Label>
                  <select
                    name="teamName"
                    value={teamNameOptionValue}
                    onChange={(e) => setTeamNameOptionValue(e.target.value)}
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
                    value={positionValue}
                    onChange={(e) => setPositionValue(e.target.value)}
                  >
                    <option value="">직무를 고르세요</option>
                    <option value="부장">부장</option>
                    <option value="차장">차장</option>
                    <option value="과장">과장</option>
                    <option value="대리">대리</option>
                    <option value="주임">주임</option>
                    <option value="사원">사원</option>
                  </select>
                </li>
                <li>
                  <Label style={{ width: "80px" }}>휴가 종류 : </Label>
                  <select
                    name="vacationType"
                    value={vacationTypeValue}
                    onChange={(e) => setVacationTypeValue(e.target.value)}
                  >
                    <option value="">휴가 종류</option>
                    <option value="연차">연차 휴가</option>
                    <option value="특별 휴가">특별 휴가</option>
                    <option value="조퇴">조퇴</option>
                    <option value="기타">기타</option>
                  </select>
                </li>
                <li>
                  <Label style={{ width: "80px" }}>휴가 기간 :</Label>
                  <select
                    name="day"
                    value={dayValue}
                    onChange={(e) => setDayValue(e.target.value)}
                  >
                    <option value="">휴가 기간</option>
                    <option value="휴가 기간 조회">휴가 기간 조회</option>
                    {/* <option value="오후">오후</option> */}
                  </select>
                </li>
                <li>
                  <Label style={{ width: "80px" }}>날짜 입력 :</Label>
                  <input
                    type="date"
                    name="dayStart"
                    value={vacationStartValue}
                    onChange={(e) => setVacationStartValue(e.target.value)}
                  ></input>
                  <input
                    type="date"
                    name="dayEnd"
                    value={vacationEndValue}
                    onChange={(e) => setVacationEndValue(e.target.value)}
                  ></input>
                </li>

                <li>
                  <label style={{ width: "80px" }}>메모(사유)</label>
                  <textarea
                    name="reason"
                    value={reasonValue}
                    onChange={(e) => {
                      setReasonValue(e.target.value);
                    }}
                    style={{ width: "95%" }}
                    placeholder="내용을 입력하세요"
                  ></textarea>
                  <ModalFooter>
                    <button className="blue" type="submit" onClick={toggle}>
                      신청하기
                    </button>
                    <button className="red" onClick={toggle}>
                      취소하기
                    </button>
                  </ModalFooter>
                </li>
              </ul>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Vacation;
