import React from "react";
import "./listStyle.css";

function GetThisMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;



  return (
    <div className="d-flex month">
      <span>{year} 년 </span>
      <span> {month} 월</span>
    </div>
  );
}

export default GetThisMonth;
