import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


const Chat = () => {
  const [roomName, setRoomName] = useState("");
  const [chatrooms, setChatrooms] = useState([]);
  // const [empNum, setEmpNum] = useState("");
  const [empName, setEmpName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    findAllRoom();
  }, []);

  //cookie에서 가져온 empname값이 무조건있어야됨
  useEffect(() => {
    const rawStaffInfo = Cookies.get("staffInfo");
    const staffInfo = JSON.parse(rawStaffInfo);
    setEmpName(staffInfo.empName);
    // setEmpNum(staffInfo.empNum); // empNum 설정
  }, []);

  const findAllRoom = () => {
    axios
      .get("/chat/rooms")
      .then((response) => {
        setChatrooms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching chat rooms:", error);
      });
  };

  const createRoom = () => {
    if (roomName === "" && roomName === null) {
      alert("방 제목을 입력해 주십시요.");
      return;
    } else {
      const params = new URLSearchParams();
      params.append("name", roomName);
      axios
        .post("/chat/room", params)
        .then((response) => {
          alert(response.data.name + "방 개설에 성공하였습니다.");
          setRoomName("");
          findAllRoom();
        })
        .catch((error) => {
          alert("채팅방 개설에 실패하였습니다.");
        });
    }
  };

  const enterRoom = (roomId) => {
    const sender = prompt("이름을 입력해 주세요.");
    if (sender !== null && sender !== "" && sender === empName) {
      localStorage.setItem("wschat.sender", sender);
      localStorage.setItem("wschat.roomId", roomId);
      navigate(`/chat/room/enter/${roomId}`);
    } else if (sender !== empName) {
      alert("입력하신 이름이 일치하지 않습니다.");
    }
  };

  const deleteRoom = (roomId) => {
    axios
      .delete("/chat/room/" + roomId)
      .then(() => {
        alert("채팅방 삭제에 성공하였습니다.");
        findAllRoom();
      })
      .catch((error) => {
        alert("채팅방 삭제에 실패하였습니다.");
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <h3>채팅방 리스트</h3>
        </div>
      </div>
      <div className="input-group">
        <div className="input-group-prepend">
          <label className="input-group-text">방제목</label>
        </div>
        <input
          type="text"
          className="form-control"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              createRoom();
            }
          }}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            onClick={createRoom}
          >
            채팅방 개설
          </button>
        </div>
      </div>
      <ul className="list-group">
        {chatrooms.map((item) => (
          <li
            key={item.roomId}
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          >
            <div onClick={() => enterRoom(item.roomId)}>{item.name}</div>
            <button
              style={{
                float: "right",
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#ff007f";
                e.target.style.fontWeight = "bold";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#000000";
                e.target.style.fontWeight = "normal";
              }}
              onClick={() => deleteRoom(item.roomId)}
            >
              Delete Room
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
