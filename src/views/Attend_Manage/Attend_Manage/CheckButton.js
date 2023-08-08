import { useState } from "react";
import "./CheckButton.css";
import { message } from "antd";

function CheckButton() {
  const [isClicked, setIsClicked] = useState(false);

  const handleToggle = () => {
    if (!isClicked) {
      message.success("출근 등록이 완료되었습니다.");
    } else {
      message.success("퇴근 등록이 완료되었습니다.");
    }
    setIsClicked((prev) => !prev);
  };

  return (
    <div className="card">
      {" "}
      <div className="CBcontent">
        <label htmlFor="big-check">
          <input
            type="checkbox"
            className="big-check"
            id="big-check"
            onClick={handleToggle}
          />
          <div className="CBcontainer">
            <div className="blok check-a"></div>
            <div className="blok side-top"></div>
            <div className="blok check-b"></div>
            <div className="blok side-left"></div>
            <div className="blok center"></div>
            <div className="blok side-right"></div>
            <div className="blok check-d"></div>
            <div className="blok side-bottom"></div>
            <div className="blok check-c"></div>
          </div>
        </label>
      </div>
    </div>
  );
}
export default CheckButton;
