import React, { useState, useEffect } from "react";
// import { useHistory } from 'react-router-dom';

import { Switch, Route } from "react-router-dom";
import "./../components/Attend_Manage/Attend_Manage.css";

import { message } from "antd";

const tabTitle = [
  {
    tabname: "출결입력",
  },
  {
    tabname: "출결기록",
  },
];

function AttendanceManagement() {
  const [tabIndex, setTabIndex] = useState(0);
  const [tabObj, setTabObj] = useState(tabTitle[tabIndex]);

  useEffect(() => {
    setTabObj(tabTitle[tabIndex]);
  }, [tabIndex]);

  function handleBtnClick(e) {
    setTabIndex(parseInt(e.target.id));
    history.push(
      `/admin/attendanceManagement/${tabTitle[
        parseInt(e.target.id)
      ].tabname.toLowerCase()}`
    );
  }

  const btnLabels = tabTitle.map((obj) => obj.tabname);

  return (
    <div className="content">
      {init && userObj && (
        <div className="card">
          <div className="tabContainer">
            <div className="navWrapper">
              <Nav
                btnLabels={btnLabels}
                tabIndex={tabIndex}
                handleBtnClick={handleBtnClick}
              />
            </div>
            <div
              className="tabcontent"
              style={{
                minHeight: "600px",
              }}
            >
              <Switch>
                <Route
                  path="/admin/attendanceManagement/출결입력"
                  render={() => <AttendanceInput />}
                />
                <Route
                  path="/admin/attendanceManagement/출결기록"
                  render={() => <AttendCalendar />}
                />
              </Switch>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AttendanceManagement;

// --------------------------------------------------------------------------------------
function Nav({ btnLabels, tabIndex, handleBtnClick }) {
  return (
    <nav className="tab">
      {btnLabels.map((label, i) => {
        return (
          <Button
            key={label}
            id={i}
            tabname={label}
            tabIndex={tabIndex}
            handleBtnClick={handleBtnClick}
          />
        );
      })}
    </nav>
  );
}

function Button({ tabname, id, tabIndex, handleBtnClick }) {
  return (
    <button
      className={id === tabIndex ? "tablinks active" : "tablinks"}
      id={id}
      onClick={(e) => handleBtnClick(e)}
    >
      {tabname}
    </button>
  );
}
