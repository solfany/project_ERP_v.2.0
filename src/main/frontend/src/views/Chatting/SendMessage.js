import React, { useState } from "react";
//import { db, authService } from "Loginbase";
// import firebase from "Loginbase";
//import { serverTimestamp } from "firebase/firestore";
// import { doc, setDoc } from "firebase/firestore";
function SendMessage() {
  const [msg, setMsg] = useState("");
  //async 함수를 사용해 메시지 전송하는 동작을 처리
  // async function sendMessage(e) {
  //   e.preventDefault();
  //   //로그인된 사용자의 객체를 가져온 뒤, 해당 객체에서 uid, photoURL, email, displayName 속성을 추출
  //   const { uid, photoURL, email, displayName} = authService.currentUser;

  //   //await 함수를 이용해 firestore에 있는 db collection에 message를 접근
  //   await db.collection("messages")
  //     .add({
  //     text: msg,
  //     photoURL,
  //     uid,
  //     email,
  //     displayName,
  //     // serverTimestamp : Date.now(),
  //     createdAt: serverTimestamp(),
  //   });

  //   setMsg("");

  //   // if (scroll.current) {
  //   //   const chatNode = scroll.current;
  //   //   chatNode.scrollTop = chatNode.scrollHeight - chatNode.clientHeight;
  //   // }
  // }

  return (
    <div>
      {/* <form onSubmit={sendMessage}> */}
      <form>
        <div className="sendMsg">
          <input
          // placeholder="write messages"
          // value={msg}
          // onChange={(e) => setMsg(e.target.value)}
          ></input>
          <button type="submit">send</button>
        </div>
      </form>
    </div>
  );
}

export default SendMessage;
// import React, { useState } from "react";
// import { Client } from "@stomp/stompjs";
// import axios from "axios"; // axios 추가

// function SendMessage({ scroll }) {
//   const [msg, setMsg] = useState("");
//   const client = new Client();

//   const sendMessage = () => {
//     if (msg.trim() === "") return;

//     const message = {
//       sender: "보내는_사람_이름",
//       messageContext: msg,
//     };

//     // axios를 사용하여 CORS 정책을 지원하며 백엔드 서버로 메시지를 전송
//     axios
//       .post("http://localhost:8888/api/sendMessage", message)
//       .then((response) => {
//         console.log("Message sent successfully:", response.data);
//         client.publish({
//           destination: "/app/sendMessage",
//           body: JSON.stringify(message),
//         });
//         setMsg("");
//       })
//       .catch((error) => {
//         console.error("Error sending message:", error);
//       });
//   };

//   return (
//     <div>
//       <div className="sendMsg">
//         <input
//           placeholder="메시지를 입력하세요"
//           value={msg}
//           onChange={(e) => setMsg(e.target.value)}
//         />
//         <button onClick={sendMessage}>전송</button>
//       </div>
//     </div>
//   );
// }

// export default SendMessage;
