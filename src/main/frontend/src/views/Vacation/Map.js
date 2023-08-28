// import React, { useState, useEffect } from "react";
// //import React, { useEffect, useState } from "react";

// import "./Map.css";

// import { Table } from "reactstrap";

// import Vacation from "./VacationModal";
// import baseData from "./MapArray";
// //import { Route } from "react-router-dom";
// import { message } from "antd";

// import axios from "axios";

// //휴가 신청란의 기본 table 값
// const Options = [
//   { id: 1, name: "#", value: "" },
//   { id: 2, name: "직원 이름", value: "" },
//   { id: 3, name: "부서", value: "" },
//   { id: 4, name: "직무", value: "" },
//   { id: 5, name: "기간", value: "" },
//   { id: 6, name: "휴가 종류", value: "" },
//   { id: 7, name: "휴가 일수", value: "" },
//   { id: 8, name: "사유", value: "" },
//   { id: 9, name: "취소", value: "" },
// ];
// const TableSub = Options.map((parameter, index) => (
//   <th
//     style={{
//       fontSize: "16px",
//       textAlign: "center",
//       fontFamily: "Poppins",
//       whiteSpace: "nowrap",
//     }}
//     key={index}
//   >
//     {parameter.name}
//   </th>
// ));

// function Map() {
//   const onRemove = (name) => {
//     const up = data.filter((item) => item.name !== name);
//     setData(up);
//     message.success("success");
//   };
//   const [data, setData] = useState(baseData);
//   return (
//     <>
//       {/* {init && userObj && */}
//       <div className="content">
//         <div className="card" style={{ minHeight: "600px", padding: "0 10px" }}>
//           <div className="calendarHead">
//             <h2 className="calendarTitle">휴가 관리</h2>
//             <div className="Mmodal_btn">
//               <Vacation
//                 data={data}
//                 setData={setData}
//                 onRemove={onRemove}
//               ></Vacation>
//             </div>
//           </div>
//           <Table style={{ whiteSpace: "nowrap" }}>
//             <thead>
//               <tr>{TableSub}</tr>
//             </thead>
//             <tbody>
//               <tr scope="row"></tr>
//               {data.map((data) => (
//                 <tr key={data.name}>
//                   <td>{data.code}</td>
//                   <td>{data.name}</td>
//                   <td>{data.teamName}</td>
//                   <td>{data.position}</td>
//                   <td>{data.etc}</td>
//                   <td>{data.vacationType}</td>
//                   <td>{data.day}</td>
//                   <td>{data.reason}</td>
//                   <td>
//                     <button className="red" onClick={() => onRemove(data.name)}>
//                       삭제1
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//             <tfoot></tfoot>
//           </Table>
//         </div>
//       </div>
//       {/* } */}
//     </>
//   );
// }

// export default Map;
import React, { useState, useEffect } from "react";
import "./Map.css";
import { Table } from "reactstrap";
import VacationModal from "./VacationModal"; // 수정된 부분
import axios from "axios";

const Options = [
  { id: 0, empName: "직원 이름", value: "" },
  { id: 1, dept: "부서", value: "" },
  { id: 2, position: "직무", value: "" },
  { id: 3, vacaType: "휴가 종류", value: "" },
  { id: 4, vacaStart: "휴가 시작", value: "" },
  { id: 5, vacaEnd: "휴가 종료", value: "" },
  { id: 6, vacaReason: "휴가 사유", value: "" },
];

const TableSub = Options.map((parameter) => (
  <th key={parameter.id}>
    {parameter.empName}
    {parameter.dept}
    {parameter.position}
    {parameter.vacaType}
    {parameter.vacaStart}
    {parameter.vacaEnd}
    {parameter.vacaReason}
  </th>
));
// ... (Options과 TableSub 등의 내용은 그대로 유지)

function Map() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchVacationData(); // 페이지 로딩 시 휴가 데이터를 불러옴
  }, []);

  const fetchVacationData = async () => {
    try {
      const response = await axios.get("http://localhost:8888/api/vacation");
      setData(response.data);
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
          <thead>
            <tr>{TableSub}</tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                {/* ... (Table 데이터 출력 부분 그대로 유지) */}
                <td>{item.empName}</td>
                <td>{item.dept}</td>
                <td>{item.position}</td>
                <td>{item.vacaType}</td>
                <td>{item.vacaStart}</td>
                <td>{item.vacaEnd}</td>
                <td>{item.vacaReason}</td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>삭제</button>
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
