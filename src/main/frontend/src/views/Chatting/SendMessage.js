//          npm install @stomp/stompjs
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useNavigate } from "react-router-dom";

const SendMessage = () => {
  const [room, setRoom] = useState({});
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);

  // useEffect(() => {
  //   const roomId = localStorage.getItem("wschat.roomId");
  //   setSender(localStorage.getItem("wschat.sender"));
  //   findRoom(roomId);
  //   const websocket = connect(roomId);
  //   setWs(websocket);
  //   return () => {
  //     if (websocket) {
  //       websocket.deactivate(); // 수정된 부분
  //     }
  //   };
  // }, []);

  const getMessages = (roomId) => {
    axios
      .get(`/chat/room/${roomId}/messages`) // <-- 서버에 메시지 조회 API 호출
      .then((response) => {
        setMessages(response.data); // <-- 받아온 메시지를 상태 변수에 설정
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  };
  useEffect(() => {
    const roomId = localStorage.getItem("wschat.roomId");
    setSender(localStorage.getItem("wschat.sender"));
    findRoom(roomId);
    getMessages(roomId); // 채팅방 입장 시 초기 대화 내역 불러오기
    const websocket = connect(roomId);
    setWs(websocket);

    return () => {
      if (websocket) {
        websocket.deactivate(); // 수정된 부분
      }
    };
  }, []);

  //채팅방을 찾기 기능
  const findRoom = (roomId) => {
    axios
      .get(`/chat/room/${roomId}`)
      .then((response) => {
        setRoom(response.data);
      })
      .catch((error) => {
        console.error("Error fetching chat room:", error);
      });
  };

  //채팅 보내기 - backend에서 enum에 대한 type이 TALK인 경우 메시지 전송
  const sendMessage = () => {
    if (!message) {
      return;
    }
    const messageData = {
      type: "TALK",
      roomId: room.roomId,
      sender,
      message,
    };

    ws.publish({
      destination: "/pub/chat/message",
      body: JSON.stringify(messageData),
    });
    setMessage("");
  };

  const recvMessage = (recv) => {
    let { type, sender: recvSender, message: recvMessage } = recv;

    if (type === "ENTER") {
      recvSender = "[ 알림 ]";
      // recvMessage = `${recv.sender}님이 입장하셨습니다.`;
    } else if (type === "QUIT") {
      recvSender = "[ 알림 ]";
      // recvMessage = `${recv.sender}님이 퇴장하셨습니다.`;
    }

    const newMessage = {
      type,
      sender: recvSender,
      message: recvMessage,
    };

    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  };
  //메시지 삭제
  const deleteMessage = (messageId) => {
    console.log("Deleting message with ID:", messageId); // <-- Add this line

    const sender = localStorage.getItem("wschat.sender");

    axios
      .delete(`/chat/message/${messageId}`, { params: { userId: sender } })
      .then(() => {
        alert("메시지가 성공적으로 삭제되었습니다.");
        // 메시지 목록을 다시 불러옵니다.
        getMessages(room.roomId);
      })
      .catch((error) => {
        console.error("Error deleting message:", error);
      });
  };
  // const deleteMessage = (messageId) => {
  //   const sender = localStorage.getItem("wschat.sender");

  //   axios
  //     .delete(`/chat/message/${messageId}`, { params: { userId: sender } })
  //     .then(() => {
  //       alert("메시지가 성공적으로 삭제되었습니다.");
  //       // 메시지 목록을 다시 불러옵니다.
  //       getMessages(room.roomId);
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting message:", error);
  //     });
  // };

  // const recvMessage = (recv) => {
  //   const receivedSender = localStorage.getItem("wschat.sender"); // 변수 이름을 setSender에서 receivedSender로 변경
  //   const { type, sender: recvSender, message: recvMessage } = recv;
  //   const newMessage = {
  //     type: type,
  //     // sender: type === "ENTER" ? "[ 알림 ]" + receivedSender : recvSender,
  //     sender: type === "ENTER" ? "[ 알림 ]" + receivedSender : recvSender,

  //     message: recvMessage,
  //   };
  //   setMessages((prevMessages) => [newMessage, ...prevMessages]);
  // };

  //접속한 연결 상태에 따른 서버단에서 보내는 메시지
  const connect = (roomId) => {
    const sock = new SockJS("http://localhost:8888/ws-stomp");
    const websocket = new Client({
      webSocketFactory: () => sock,
      // ...
    });
    let reconnect = 0;

    websocket.onConnect = (frame) => {
      websocket.subscribe(`/sub/chat/room/${roomId}`, (message) => {
        const recv = JSON.parse(message.body);
        recvMessage(recv);
      });

      const enterMessage = {
        type: "ENTER",
        roomId,
        sender: localStorage.getItem("wschat.sender"),
      };
      websocket.publish({
        destination: "/pub/chat/message",
        body: JSON.stringify(enterMessage),
      });
    };

    websocket.onStompError = (frame) => {
      if (reconnect++ <= 5) {
        setTimeout(() => {
          console.log("Connection reconnect");
          const newSock = new SockJS("http://localhost:8888/ws-stomp");
          const newWebsocket = new Client({
            webSocketFactory: () => newSock,
            // ...
          });
          setWs(newWebsocket);
          connect(roomId);
        }, 10 * 1000);
      }
    };

    websocket.activate();
    return websocket;
  };

  const navigate = useNavigate();

  const leaveRoom = () => {
    const roomId = localStorage.getItem("wschat.roomId");
    const sender = localStorage.getItem("wschat.sender");

    // 채팅방 퇴장 메시지를 생성하고 서버에 전송합니다.
    const quitMessage = {
      type: "QUIT",
      roomId,
      sender: localStorage.getItem("wschat.sender"),
    };

    ws.publish({
      destination: "/pub/chat/message",
      body: JSON.stringify(quitMessage),
    });

    axios
      .delete(`/chat/room/${roomId}/leave`, { params: { userId: sender } })
      .then(() => {
        alert("채팅방에서 나갑니다.");
        navigate("/Chatting/Chat"); // <-- 변경된 부분
      })
      .catch((error) => {
        console.error("Error leaving chat room:", error);
      });
  };

  return (
    <div className="container">
      <div>
        <h2>{room.name}</h2>
      </div>
      <div className="input-group">
        <div className="input-group-prepend">
          <label className="input-group-text">내용</label>
        </div>
        <input
          type="text"
          className="form-control"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            onClick={sendMessage}
          >
            보내기
          </button>
          {/* 나가기 버튼 추가 */}
          <button
            className="btn btn-secondary"
            type="button"
            onClick={leaveRoom}
          >
            나가기
          </button>
        </div>
      </div>
      <ul className="list-group">
        {messages.map((msg, index) => (
          <li key={index} className="list-group-item">
            {msg.sender} - {msg.message}
            {/* 현재 사용자가 이 메시지의 송신자일 경우만 삭제 버튼을 표시합니다. */}
            {msg.sender === sender && (
              <button onClick={() => deleteMessage(msg.chat_message_id)}>
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SendMessage;
