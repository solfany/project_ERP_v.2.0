import React from "react";
import "./listStyle.css";

function GetThisMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const options = [];
  for (let i = 1; i < 4; i++) {
    options.push(
      <option key={month - i} value={month - i}>
        {month - i}
      </option>
    );
  }

  return (
    <div className="d-flex month">
      <span>{year} 년</span>
      <select style={{fontSize: '20px'}} value={month}>{options}</select>
      <span> 월</span>
    </div>
  );
}

export default GetThisMonth;
