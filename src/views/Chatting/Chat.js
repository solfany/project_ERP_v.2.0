import React, { useState, useEffect, useRef } from "react";
// import Signout from "components/Chatting/Signout";
//import { db, authService } from "Loginbase";
import SendMessage from "./SendMessage";
// import { onSnapshot } from 'firebase/firestore'
import "./Chat.css";
// import { displayName } from "react-quill";
//useEffect 쓰는 이유는 페이지가 로드 될떄 사용효과가 한번 실행
//사용효과가 내부의 변수중 하나가 변경될떄마다 사용효과가  실행? 뭔개소리?
const Chat = () => {
  const scroll = useRef(null);
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   db.collection('messages')
  //     .orderBy('createdAt')
  //     .limit(100)
  //     .onSnapshot((snapshot) => {
  //       setMessages(snapshot.docs.map((doc) => doc.data()))
  //     })
  // }, [])
  //console.log(messages)

  return (
    <div className="scroll" ref={scroll}>
      {/* <Signout></Signout> */}
      <div className="msgs">
        <div style={{ fontSize: "30px" }}>
          사내 오픈 메신저 방입니다 환영합니다.
        </div>
        {/* {messages.map(({ id, text, photoURL, uid, displayName }) => ( */}
        <div>
          <div
          //
          // key={id}
          // className={`msg ${uid === authService.currentUser.uid ? 'sent' : 'received'}`}
          >
            {/* 보여지느 프로필 이미지 */}
            {/* <img className="chatUserImg" src={photoURL} alt="img"></img> */}
            <div>
              <p
                style={{
                  paddingRight: "10px",
                  fontSize: "17px",
                  fontWeight: "700",
                }}
              >
                {/* 이름 관련 */}
                {/* {displayName} */}
              </p>
              {/* 내용 관련 */}
              {/* <p className="chatText">{text}</p> */}
            </div>
          </div>
        </div>
        {/* ))} */}
      </div>
      <SendMessage scroll={scroll} />
      <div ref={scroll}></div>
    </div>
  );
};

export default Chat;