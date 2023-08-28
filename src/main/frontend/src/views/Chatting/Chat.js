// import React, { useState, useEffect, useRef } from "react";
// // import Signout from "components/Chatting/Signout";
// //import { db, authService } from "Loginbase";
// import SendMessage from "./SendMessage";
// // import { onSnapshot } from 'firebase/firestore'
// import "./Chat.css";
// // import { displayName } from "react-quill";
// //useEffect 쓰는 이유는 페이지가 로드 될떄 사용효과가 한번 실행
// //사용효과가 내부의 변수중 하나가 변경될떄마다 사용효과가  실행? 뭔개소리?
// const Chat = () => {
//   const scroll = useRef(null);
//   const [messages, setMessages] = useState([]);

//   // useEffect(() => {
//   //   db.collection('messages')
//   //     .orderBy('createdAt')
//   //     .limit(100)
//   //     .onSnapshot((snapshot) => {
//   //       setMessages(snapshot.docs.map((doc) => doc.data()))
//   //     })
//   // }, [])
//   //console.log(messages)

//   return (
//     <div className="scroll" ref={scroll}>
//       {/* <Signout></Signout> */}
//       <div className="msgs">
//         <div style={{ fontSize: "30px" }}>
//           사내 오픈 메신저 방입니다 환영합니다.
//         </div>
//         {/* {messages.map(({ id, text, photoURL, uid, displayName }) => ( */}
//         <div>
//           <div
//           //
//           // key={id}
//           // className={`msg ${uid === authService.currentUser.uid ? 'sent' : 'received'}`}
//           >
//             {/* 보여지느 프로필 이미지 */}
//             {/* <img className="chatUserImg" src={photoURL} alt="img"></img> */}
//             <div>
//               <p
//                 style={{
//                   paddingRight: "10px",
//                   fontSize: "17px",
//                   fontWeight: "700",
//                 }}
//               >
//                 {/* 이름 관련 */}
//                 {/* {displayName} */}
//               </p>
//               {/* 내용 관련 */}
//               {/* <p className="chatText">{text}</p> */}
//             </div>
//           </div>
//         </div>
//         {/* ))} */}
//       </div>
//       <SendMessage scroll={scroll} />
//       <div ref={scroll}></div>
//     </div>
//   );
// };

// export default Chat;

// // import React, { useState, useEffect, useRef } from "react";
// // import { Client } from "@stomp/stompjs";
// // import axios from "axios"; // axios 추가
// // import SendMessage from "./SendMessage";

// // function Chat() {
// //   const scroll = useRef(null);
// //   const [messages, setMessages] = useState([]);
// //   const client = new Client();

// //   useEffect(() => {
// //     client.configure({
// //       brokerURL: "ws:/localhost:8888/ws", // 수정된 주소 형식
// //       onConnect: () => {
// //         client.subscribe('/topic/messages', (message) => { // 수정된 주소 형식
// //           const receivedMessage = JSON.parse(message.body);
// //           setMessages((prevMessages) => [...prevMessages, receivedMessage]);
// //           scroll.current.scrollTop = scroll.current.scrollHeight;
// //         });
// //       },
// //     });

// //     client.activate();

// //     return () => client.deactivate();
// //   }, []);

// //   const sendMessage = (message) => {
// //     // 메시지 전송 함수
// //     axios.post("http://localhost:8888/api/sendMessage", message)
// //       .then(response => {
// //         console.log("Message sent successfully:", response.data);
// //       })
// //       .catch(error => {
// //         console.error("Error sending message:", error);
// //       });
// //   };
// //   return (
// //     <div className="scroll" ref={scroll}>
// //       <div className="msgs">
// //         {messages.map((message, index) => (
// //           <div key={index}>
// //             <p>
// //               {message.sender}: {message.messageContext}
// //             </p>
// //           </div>
// //         ))}
// //       </div>
// //       <SendMessage scroll={scroll} sendMessage={sendMessage} />
// //     </div>
// //   );
// // }

// // export default Chat;
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";

import SendMessage from "./SendMessage";

import "./Chat.css";

const Chat = () => {
  const scroll = useRef(null);
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  // useEffect(() => {
  //   // WebSocket 연결
  //   const socket = new SockJS("/ws"); // 서버의 WebSocket 엔드포인트
  //   const stomp = Stomp.over(socket);

  //   stomp.connect({}, () => {
  //     setStompClient(stomp);

  //     // 채팅 메시지를 구독
  //     stomp.subscribe("/topic/chat", (message) => {
  //       const newMessage = JSON.parse(message.body);
  //       setMessages((prevMessages) => [...prevMessages, newMessage]);
  //     });
  //   });

  //   return () => {
  //     if (stompClient) {
  //       stompClient.disconnect();
  //     }
  //   };
  // }, []);

  return (
    <div className="scroll" ref={scroll}>
      <div className="msgs">
        {/* 메시지 출력 */}
        {messages.map((message, index) => (
          <div key={index} className="msg">
            {/* 메시지 내용 표시 */}
            <p className="chatText">{message.messageContext}</p>
          </div>
        ))}
      </div>
      <SendMessage scroll={scroll} stompClient={stompClient} />
      <div ref={scroll}></div>
    </div>
  );
};

export default Chat;
