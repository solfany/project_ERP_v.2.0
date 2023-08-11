import React, { useEffect, useState } from "react";
import moment from "moment";
import Clock from "./Clock";
import CheckButton from "./CheckButton";
import Welcome from "./Welcome";

function Attend_Input() {
  const [attendanceStatus, setAttendanceStatus] = useState("");
  const [time, setTime] = useState(moment().format("HH:mm"));

  useEffect(() => {
    const currentTime = moment();
    if (currentTime.hours() >= 13) {
      setAttendanceStatus("결근");
    } else if (currentTime.hours() >= 9) {
      setAttendanceStatus("지각");
    } else {
      setAttendanceStatus("출근");
    }
  }, [time]);

  return (
    <div className="attendContainer">
      <Clock
        time={time}
        setTime={setTime}
        attendanceStatus={attendanceStatus}
      />
      <div className="blue_circle">
        <CheckButton />
      </div>
      {/* <Welcome /> */}
    </div>
  );
}

export default Attend_Input;
