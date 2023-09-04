// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// // import SockJS from "sockjs-client";
// // import Stomp from "stompjs";

// import SendMessage from "./SendMessage";

// import "./Chat.css";

// const Chat = () => {
//   const scroll = useRef(null);
//   const [messages, setMessages] = useState([]);
//   const [stompClient, setStompClient] = useState(null);

//   return (
//     <div className="scroll" ref={scroll}>
//       <div className="msgs">
//         {/* 메시지 출력 */}
//         {messages.map((message, index) => (
//           <div key={index} className="msg">
//             {/* 메시지 내용 표시 */}
//             <p className="chatText">{message.messageContext}</p>
//           </div>
//         ))}
//       </div>
//       <SendMessage scroll={scroll} stompClient={stompClient} />
//       <div ref={scroll}></div>
//     </div>
//   );
// };

// export default Chat;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [roomName, setRoomName] = useState("");
  const [chatrooms, setChatrooms] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    findAllRoom();
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
    if (roomName === "") {
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

  // const enterRoom = (roomId) => {
  //   const sender = prompt("대화명을 입력해 주세요.");
  //   if (sender !== null && sender !== "") {
  //     localStorage.setItem("wschat.sender", sender);
  //     localStorage.setItem("wschat.roomId", roomId);
  //     window.location.href = `/chat/room/enter/${roomId}`;
  //   }
  // };
  const enterRoom = (roomId) => {
    const sender = prompt("이름을 입력해 주세요.");
    if (sender !== null && sender !== "") {
      localStorage.setItem("wschat.sender", sender);
      localStorage.setItem("wschat.roomId", roomId);
      navigate(`/chat/room/enter/${roomId}`);
      // navigate("/SendMessage");
    }
  };

  return (
    <div className="container">
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
            className="list-group-item list-group-item-action"
            onClick={() => enterRoom(item.roomId)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Chat = () => {
//   const [roomName, setRoomName] = useState("");
//   const [chatrooms, setChatrooms] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchChatRooms();
//   }, []);

//   const fetchChatRooms = () => {
//     axios
//       .get("/chat/rooms")
//       .then((response) => {
//         setChatrooms(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching chat rooms:", error);
//       });
//   };

//   const createChatRoom = () => {
//     if (roomName === "") {
//       alert("방 제목을 입력해 주십시오.");
//       return;
//     }

//     const params = { name: roomName };
//     axios
//       .post("/chat/room", params)
//       .then((response) => {
//         alert(response.data.name + "방 개설에 성공하였습니다.");
//         setRoomName("");
//         fetchChatRooms();
//       })
//       .catch((error) => {
//         alert("채팅방 개설에 실패하였습니다.");
//       });
//   };

//   const enterChatRoom = (roomId) => {
//     const sender = prompt("이름을 입력해 주세요.");
//     if (sender !== null && sender.trim() !== "") {
//       localStorage.setItem("wschat.sender", sender);
//       localStorage.setItem("wschat.roomId", roomId);
//       navigate(`/chat/room/enter/${roomId}`);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-12">
//           <h3>채팅방 리스트</h3>
//         </div>
//       </div>
//       <div className="input-group">
//         <div className="input-group-prepend">
//           <label className="input-group-text">방제목</label>
//         </div>
//         <input
//           type="text"
//           className="form-control"
//           value={roomName}
//           onChange={(e) => setRoomName(e.target.value)}
//           onKeyUp={(e) => {
//             if (e.key === "Enter") {
//               createChatRoom();
//             }
//           }}
//         />
//         <div className="input-group-append">
//           <button
//             className="btn btn-primary"
//             type="button"
//             onClick={createChatRoom}
//           >
//             채팅방 개설
//           </button>
//         </div>
//       </div>
//       <ul className="list-group">
//         {chatrooms.map((item) => (
//           <li
//             key={item.roomId}
//             className="list-group-item list-group-item-action"
//             onClick={() => enterChatRoom(item.roomId)}
//           >
//             {item.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Chat;
