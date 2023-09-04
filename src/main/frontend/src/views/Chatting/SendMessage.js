// import React, { useState } from "react";

// function SendMessage({ scroll, stompClient }) {
//   const [msg, setMsg] = useState("");

//   return (
//     <div>
//       <form onSubmit={sendMessage}>
//         <div className="sendMsg">
//           <input
//             placeholder="write messages"
//             value={msg}
//             onChange={(e) => setMsg(e.target.value)}
//           />
//           <button type="submit">send</button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default SendMessage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";


// const SendMessage = () => {
//   const [room, setRoom] = useState({});
//   const [sender, setSender] = useState("");
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [ws, setWs] = useState(null);

//   useEffect(() => {
//     const roomId = localStorage.getItem("wschat.roomId");
//     setSender(localStorage.getItem("wschat.sender"));
//     findRoom(roomId);
//     const websocket = connect(roomId);
//     setWs(websocket);
//     return () => {
//       if (websocket) {
//         websocket.disconnect();
//       }
//     };
//   }, []);

//   const findRoom = (roomId) => {
//     axios
//       .get(`/chat/room/${roomId}`)
//       .then((response) => {
//         setRoom(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching chat room:", error);
//       });
//   };

//   const sendMessage = () => {
//     if (!message) {
//       return;
//     }
//     const messageData = {
//       type: "TALK",
//       roomId: room.roomId,
//       sender,
//       message,
//     };

//     ws.send("/pub/chat/message", {}, JSON.stringify(messageData));
//     setMessage("");
//   };

//   const recvMessage = (recv) => {
//     const { type, sender: recvSender, message: recvMessage } = recv;
//     const newMessage = {
//       type,
//       sender: type === "ENTER" ? "[알림]" : recvSender,
//       message: recvMessage,
//     };
//     setMessages((prevMessages) => [newMessage, ...prevMessages]);
//   };

//   const connect = (roomId) => {
//     const sock = new SockJS("/ws-stomp");
//     const websocket = Stomp.over(sock);
//     let reconnect = 0;

//     websocket.connect(
//       {},
//       (frame) => {
//         websocket.subscribe(`/sub/chat/room/${roomId}`, (message) => {
//           const recv = JSON.parse(message.body);
//           recvMessage(recv);
//         });

//         const enterMessage = {
//           type: "ENTER",
//           roomId,
//           sender,
//         };
//         websocket.send("/pub/chat/message", {}, JSON.stringify(enterMessage));
//       },
//       (error) => {
//         if (reconnect++ <= 5) {
//           setTimeout(() => {
//             console.log("Connection reconnect");
//             const newSock = new SockJS("/ws-stomp");
//             const newWebsocket = Stomp.over(newSock);
//             setWs(newWebsocket);
//             connect(roomId);
//           }, 10 * 1000);
//         }
//       }
//     );

//     return websocket;
//   };

//   return (
//     <div className="container">
//       <div>
//         <h2>{room.name}</h2>
//       </div>
//       <div className="input-group">
//         <div className="input-group-prepend">
//           <label className="input-group-text">내용</label>
//         </div>
//         <input
//           type="text"
//           className="form-control"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               sendMessage();
//             }
//           }}
//         />
//         <div className="input-group-append">
//           <button
//             className="btn btn-primary"
//             type="button"
//             onClick={sendMessage}
//           >
//             보내기
//           </button>
//         </div>
//       </div>
//       <ul className="list-group">
//         {messages.map((msg, index) => (
//           <li key={index} className="list-group-item">
//             {msg.sender} - {msg.message}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SendMessage;
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

    ws.send("/pub/chat/message", {}, JSON.stringify(messageData));
    setMessage("");
  };

  const recvMessage = (recv) => {
    const { type, sender: recvSender, message: recvMessage } = recv;
    const newMessage = {
      type,
      sender: type === "ENTER" ? "[알림]" : recvSender,
      message: recvMessage,
    };
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  };

  const connect = (roomId) => {
    const sock = new SockJS("/ws-stomp");
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
        sender,
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
          const newSock = new SockJS("/ws-stomp");
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