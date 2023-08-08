import React, { useState } from "react";
import initialEmployeeData from "./EmployeeData";
import "./Attend_Record.css";
import { Button, Modal } from "antd";

function Attend_Record() {
  const [employeeData, setEmployeeData] = useState(initialEmployeeData);
  const [open, setOpen] = useState(false);
  console.log(employeeData);
  // 한달 간의 날짜를 배열로 만듭니다.
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  // 토요일과 일요일의 인덱스를 구합니다.
  const saturdayIndex = new Date().getDay() === 6 ? 0 : 6;
  const sundayIndex = saturdayIndex + 1 >= dates.length ? 0 : saturdayIndex + 1;

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        출근 기록 표 가져오기
      </Button>
      <Modal
        title="출근 기록 표"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1500}
      >
        <table>
          <thead>
            <tr>
              <th></th>
              {dates.map((date) => {
                const day = new Date(2023, 4, date).getDay(); // 0: 일요일, 6: 토요일
                let className = "";
                if (day === 0) {
                  className = "sunday";
                } else if (day === 6) {
                  className = "saturday";
                }
                return (
                  <th key={date} className={className}>
                    {date}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee) => (
              <tr key={employee.name}>
                <td>{employee.name}</td>
                {dates.map((date) => {
                  const shift = employee.shifts.find((s) =>
                    s.date.endsWith(`-${String(date).padStart(2, "0")}`)
                  );
                  return (
                    <td key={`${employee.name}-${date}`}>
                      {shift ? `${shift.start} - ${shift.end}` : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </>
  );
}

export default Attend_Record;
