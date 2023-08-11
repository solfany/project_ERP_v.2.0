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
      <form >
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
