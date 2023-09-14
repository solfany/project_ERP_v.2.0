import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Label } from "reactstrap";
// import { CModal, CModalHeader, CModalBody, CModalFooter, CLabel } from "@coreui/react";
import axios from "axios";
import { message } from "antd";
import Cookies from "js-cookie";

function VacationModal({ fetchVacationData }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  // const [empNum, setEmpNum] = useState("");
  // const [userInfo, setUserInfo] = useState("");
  const rawStaffInfo = Cookies.get("staffInfo");
  const staffInfo = JSON.parse(rawStaffInfo);

  const [empNum, setEmpNum] = useState("");
  const [empName, setEmpName] = useState("");

  const [dept, setDept] = useState("");
  const [position, setPosition] = useState("");
  const [vacaType, setVacaType] = useState("");
  const [vacaStart, setVacaStart] = useState(new Date());
  const [vacaEnd, setVacaEnd] = useState(new Date());
  const [vacaEtc, setVacaEtc] = useState(0);
  const [vacaReason, setVacaReason] = useState("");

  useEffect(() => {
    const rawStaffInfo = Cookies.get("staffInfo");
    const staffInfo = JSON.parse(rawStaffInfo);
    setEmpNum(staffInfo.empNum);
  }, []); // 빈 배열은 이펙트가 처음 한 번만 실행되도록 합니다.

  // vacaStart 또는 vacaEnd가 변경될 때마다 vacaEtc를 다시 계산
  useEffect(() => {
    const startDate = new Date(vacaStart);
    const endDate = new Date(vacaEnd);
    const timeDiff = endDate - startDate;

    if (timeDiff < 0) {
      setVacaEtc("0일");
      if (vacaType !== "조퇴") {
        // '조퇴'인 경우 에러 메시지 출력 안함
        message.error("휴가 입력 기간이 잘못되었습니다.");
      }
      return;
    }

    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    setVacaEtc(dayDiff + "일");
  }, [vacaStart, vacaEnd, vacaType]); // useEffect 의존성 배열에 vacaType 추가

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const vacationDto = {
        empNum: staffInfo.empNum,
        empName,
        dept,
        position,
        vacaType,
        vacaStart,
        vacaEnd,
        vacaEtc,
        vacaReason,
        // staffInfo, // staffInfo 객체를 포함
      };

      if (
        !empNum ||
        !empName ||
        !dept ||
        !position ||
        !vacaType ||
        !vacaStart ||
        !vacaEnd ||
        !vacaEtc ||
        !vacaReason
      ) {
        return alert("모두 입력하세요");
      }

      if (empNum !== staffInfo.empNum) {
        return alert("입력된 사원 번호가 사용자 정보와 일치하지 않습니다.");
      }
      if (empName !== staffInfo.empName) {
        return alert("입력된 사원 이름이 사용자 정보와 일치하지 않습니다.");
      }
      if (dept !== staffInfo.dept) {
        return alert("입력된 부서가 사용자 정보와 일치하지 않습니다.");
      }
      if (position !== staffInfo.position) {
        return alert("입력된 직책이 사용자 정보와 일치하지 않습니다.");
      }

      if (vacaEtc === "0일" && vacaType !== "조퇴") {
        return alert("휴가 입력 기간이 잘못되었습니다.");
      }

      if (vacaType === "조퇴" && vacaEtc !== "0일") {
        // '조퇴'인데 휴가 일수가 '0일'이 아닌 경우 에러 메시지 출력
        return alert("조퇴의 경우, 휴가 일수는 반드시 '0일'이어야 합니다.");
      }

      await axios.post("http://localhost:8888/api/vacation", vacationDto);
      console.log(vacationDto);
      setEmpNum(staffInfo.empNum);
      setEmpName("");
      setDept("");
      setPosition("");
      setVacaType("");
      setVacaStart(new Date());
      setVacaEnd(new Date());
      setVacaReason("");
      setVacaEtc();
      toggle();
      fetchVacationData();
    } catch (error) {
      console.error("Error adding vacation request:", error);
    }
  };
  return (
    <div>
      <button onClick={toggle} className="btn btn-primary">
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
            <form onSubmit={handleSubmit} className="form-group">
              <ul>
                <li>
                  <Label style={{ width: "300px" }}>
                    사원 번호 : {staffInfo.empNum}
                  </Label>
                </li>

                <li>
                  <Label>이름 </Label>
                  <input
                    type="empName"
                    name="empName"
                    placeholder="이름을 입력하세요"
                    value={empName}
                    onChange={(e) => setEmpName(e.target.value)}
                    className="form-control" // 추가된 부분
                  ></input>
                </li>

                <li>
                  <Label style={{ width: "80px" }}>부서 </Label>
                  <select
                    name="dept"
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    className="form-control" // 추가된 부분
                  >
                    <option value="">부서를 고르세요</option>
                    <option value="개발팀">개발팀</option>
                    <option value="관리팀">관리팀</option>
                    <option value="인사팀">인사팀</option>
                    <option value="경영팀">경영팀</option>
                    <option value="영업팀">영업팀</option>
                    <option value="회계팀">회계팀</option>
                  </select>
                </li>
                <li>
                  <Label style={{ width: "80px" }}>직무</Label>
                  <select
                    name="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="form-control" // 추가된 부분
                  >
                    <option value="">직급를 고르세요</option>
                    <option value="사장">사장</option>
                    <option value="부장">부장</option>
                    <option value="차장">차장</option>
                    <option value="과장">과장</option>
                    <option value="주임">주임</option>
                    <option value="사원">사원</option>
                    <option value="대리">대리</option>
                  </select>
                </li>
                <li>
                  <Label style={{ width: "80px" }}>휴가 종류 </Label>
                  <select
                    name="vacaType"
                    value={vacaType}
                    onChange={(e) => setVacaType(e.target.value)}
                    className="form-control" // 추가된 부분
                  >
                    <option value="">휴가 종류</option>
                    <option value="연차">연차 휴가</option>
                    <option value="특별 휴가">특별 휴가</option>
                    <option value="조퇴">조퇴</option>
                    <option value="기타">기타</option>
                  </select>
                </li>
                <li>
                  <Label style={{ width: "80px" }}>휴가 시작 </Label>
                  <input
                    type="date"
                    name="dayStart"
                    value={vacaStart}
                    onChange={(e) => setVacaStart(e.target.value)}
                    className="form-control" // 추가된 부분
                  ></input>
                </li>
                <li>
                  <Label style={{ width: "80px" }}>휴가 종료 </Label>
                  <input
                    type="date"
                    name="dayEnd"
                    value={vacaEnd}
                    onChange={(e) => setVacaEnd(e.target.value)}
                    className="form-control" // 추가된 부분
                  ></input>
                </li>
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
                    className="form-control" // 추가된 부분
                    placeholder="휴가 사유를 입력하세요"
                  ></textarea>
                </li>
              </ul>
            </form>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            신청하기
          </button>
          <button
            className="btn btn-danger"
            onClick={toggle}
            style={{ color: "white" }}
          >
            취소하기
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default VacationModal;
