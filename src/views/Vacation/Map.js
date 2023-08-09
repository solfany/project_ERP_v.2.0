import React, {  useState } from "react";
//import React, { useEffect, useState } from "react";

import "./Map.css";

import {
  Table,
} from "reactstrap";

import Vacation from "./VacationModal"
import baseData from "./MapArray";
//import { Route } from "react-router-dom";
import { message } from "antd";
import { useSelector } from "react-redux";


//휴가 신청란의 기본 table 값
const Options = [
  { id: 1, name: "#", value: "" },
  { id: 2, name: "직원 이름", value: "" },
  { id: 3, name: "부서", value: "" },
  { id: 4, name: "직무", value: "" },
  { id: 5, name: "기간", value: "" },
  { id: 6, name: "휴가 종류", value: "" },
  { id: 7, name: "휴가 일수", value: "" },
  { id: 8, name: "사유", value: "" },
  { id: 9, name: "취소", value: "" },
];
const TableSub = Options.map((parameter, index) => (
  <th style={{fontSize:'16px', textAlign:'center', fontFamily : 'Poppins', whiteSpace:'nowrap'}} key={index}>{parameter.name}</th>
));

function Map() {
  const onRemove = (name) =>{
    const up = data.filter((item)=>item.name !== name)
    setData(up);
    message.success('success')
  }
  const [data, setData] = useState(baseData);
  const init = useSelector((state) => state.init);
  const userObj = useSelector((state) => state.userObj);
  // const history = useHistory();
  // useEffect(() => {
  //   if (init && userObj) {
  //     // 처음 렌더링할 거 있으면 넣는 곳
  //   } else {
  //     message.error('로그인 정보가 없습니다. 다시 로그인 해주세요.')
  //     history.push('/admin/MainLogin');
  //   }
  // }, [init, userObj, history]);
  return (
    <>
    {/* {init && userObj && */}
    <div className="content">
      <div className="card" style={{minHeight: '600px', padding: '0 10px'}}>
      <div className="calendarHead">
      <h2 className="calendarTitle">휴가 관리</h2>
      <div className="Mmodal_btn">
        <Vacation data={data} setData={setData} onRemove={onRemove} ></Vacation>
        </div>
    </div>
      <Table style={{ whiteSpace: 'nowrap', }}>
        <thead>
          <tr>{TableSub}</tr>
        </thead>
        <tbody>
          <tr scope="row"></tr>
          {data.map((data) => (
            <tr key={data.name}>
              <td>{data.code}</td>
              <td>{data.name}</td>
              <td>{data.teamName}</td>
              <td>{data.position}</td>
              <td>{data.etc}</td>
              <td>{data.vacationType}</td>
              <td>{data.day}</td>
              <td>{data.reason}</td>
              <td>
                <button className="red" onClick={() => onRemove(data.name)}>삭제</button></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
        </tfoot>
      </Table>
      </div>
    </div>
          {/* } */}
    </>
  );
}

export default Map;
