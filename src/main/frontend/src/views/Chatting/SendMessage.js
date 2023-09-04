//          npm install @stomp/stompjs
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const SendMessage = () => {
  const [room, setRoom] = useState({});
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const roomId = localStorage.getItem("wschat.roomId");
    setSender(localStorage.getItem("wschat.sender"));
    findRoom(roomId);
    const websocket = connect(roomId);
    setWs(websocket);
    return () => {
      if (websocket) {
        websocket.disconnect();
      }
    };
  }, []);

  //채팅방을 찾기
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
    const receivedSender = localStorage.getItem("wschat.sender"); // 변수 이름을 setSender에서 receivedSender로 변경
    const { type, sender: recvSender, message: recvMessage } = recv;
    const newMessage = {
      type: type,
      // sender: type === "ENTER" ? "[ 알림 ]" + receivedSender : recvSender,
      sender: type === "ENTER" ? "[ 알림 ]" + receivedSender : recvSender,

      message: recvMessage,
    };
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  };

  //WS-STOMP를 이용해 접속했을때 구독?을 하는 상태
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
        </div>
      </div>
      <ul className="list-group">
        {messages.map((msg, index) => (
          <li key={index} className="list-group-item">
            {msg.sender} - {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SendMessage;
