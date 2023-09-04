import React, { useState, useEffect } from "react";
import "./css/LikeHeartBtn.css";
import { CCol, CRow } from "@coreui/react";
import axios from "axios";

const LikeHeartBtn = ({ postNum }) => {
  const [likeActive, setLikeActive] = useState(false);
  const [clapActive, setClapActive] = useState(false);
  const [postLike, setPostLike] = useState(0);
  const [postRecommend, setPostRecommend] = useState(0);

  const handleLikeClick = () => {
    setLikeActive(!likeActive);
  };

  const handleClapClick = () => {
    setClapActive(!clapActive);
  };

  return (
    <CRow className="LikeHeartBtnLayout">
      <CCol md={9}>
        <span
          className={`like-btn ${likeActive ? "like-active" : ""}`}
          onClick={handleLikeClick}
        >
          {" "}
          + {postLike} 추천{" "}
        </span>
        <span
          className={`clap-btn ${clapActive ? "clap-active" : ""}`}
          onClick={handleClapClick}
        >
          + {postRecommend} 공감
        </span>
      </CCol>
    </CRow>
  );
};

export default LikeHeartBtn;
