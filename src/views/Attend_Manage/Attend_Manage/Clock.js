import React, { useState, useEffect } from "react";
import moment from "moment";
import "./Attend_Manage.css";

const Clock = ({ time, setTime, attendanceStatus }) => {
  const [seconds, setSeconds] = useState(moment().format("ss"));

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setTime(moment().format("HH:mm"));
      setSeconds(moment().format("ss"));
    }, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  return (
    <div className="container">
      <section className="clock-container">
        <div className="clock-containerDiv">
          <time className="time">
            {time}
            <time className="seconds">{seconds}</time>
          </time>
          <span className="attques">/</span>
          <span
            className="attStatus"
            style={
              attendanceStatus === "출근" ? { color: "blue" } : { color: "red" }
            }
          >
            {attendanceStatus}
          </span>
        </div>
      </section>
    </div>
  );
};

export default Clock;
