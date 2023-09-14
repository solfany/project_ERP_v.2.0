import React, { useState, useEffect } from "react";
import "./Map.css";
import { Table } from "reactstrap";
import VacationModal from "./VacationModal"; // 수정된 부분
import axios from "axios";
import Cookies from "js-cookie";

const Options = [
  { id: 0, label: "사원 번호", key: "empNum" },
  { id: 1, label: "직원 이름", key: "empName" },
  { id: 2, label: "부서", key: "dept" },
  { id: 3, label: "직무", key: "position" },
  { id: 4, label: "휴가 종류", key: "vacaType" },
  { id: 5, label: "휴가 시작", key: "vacaStart" },
  { id: 6, label: "휴가 종료", key: "vacaEnd" },
  { id: 7, label: "휴가 일수", key: "vacaEtc" },
  { id: 8, label: "휴가 사유", key: "vacaReason" },
  { id: 9, label: "삭제" },
];

const TableSub = Options.map((parameter) => (
  <th key={parameter.id}>{parameter.label}</th>
));
// ... (Options과 TableSub 등의 내용은 그대로 유지)

function Map() {
  const [data, setData] = useState([]);
  const [currentEmpNum, setCurrentEmpNum] = useState("");

  useEffect(() => {
    fetchVacationData(); // 페이지 로딩 시 휴가 데이터를 불러옴
    const rawStaffInfo = Cookies.get("staffInfo"); // 쿠키에서 staffInfo 가져오기
    if (rawStaffInfo) {
      const staffInfo = JSON.parse(rawStaffInfo);
      setCurrentEmpNum(staffInfo.empNum); // empNum 설정
    }
  }, []);

  const fetchVacationData = async () => {
    try {
      const response = await axios.get("http://localhost:8888/api/vacation");
      setData(response.data);
      console.log(response.data); // 데이터 확인용 로그
    } catch (error) {
      console.error("휴가 - 데이터 생성 실패:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      //백틱을 사용하면 문자열 내에 ${id}와 같은 변수 값을 포함시킬 수 있고,
      //코드가 더 간결해지며 가독성도 향상됩니다.
      //따라서 React나 JavaScript에서 동적인 값을 문자열에 삽입할 때는 백틱을 사용하는 것이 좋습니다.
      await axios.delete(`http://localhost:8888/api/vacation/${id}`);
      fetchVacationData(); // 삭제 후 데이터 다시 불러오기
    } catch (error) {
      console.error("휴가 - 데이터 삭제 실패 :", error);
    }
  };

  // ... (handleRemove 등의 내용은 그대로 유지)

  return (
    <div className="content">
      <div className="card" style={{ minHeight: "600px", padding: "0 10px" }}>
        <div className="calendarHead">
          <h2 className="calendarTitle">휴가 관리</h2>
          <div className="Mmodal_btn">
            <VacationModal fetchVacationData={fetchVacationData} />{" "}
            {/* 수정된 부분 */}
          </div>
        </div>
        <Table style={{ whiteSpace: "nowrap" }}>
          <thead style={{ textAlign: "center" }}>
            <tr>{TableSub}</tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.staff?.empNum}</td>
                <td>{item.empName}</td>
                <td>{item.dept}</td>
                <td>{item.position}</td>
                <td>{item.vacaType}</td>
                <td>{new Date(item.vacaStart).toISOString().slice(0, 10)}</td>
                <td>{new Date(item.vacaEnd).toISOString().slice(0, 10)}</td>
                <td>{item.vacaEtc}</td>
                <td>{item.vacaReason}</td>
                <td>
                  {(currentEmpNum === item.staff?.empNum ||
                    item.staff?.empNum === null) && (
                    <button
                      onClick={() => handleDelete(item.id)}
                      style={{ color: "red" }}
                      className="delete-button"
                    >
                      삭제
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot></tfoot>
        </Table>
      </div>
    </div>
  );
}

export default Map;
