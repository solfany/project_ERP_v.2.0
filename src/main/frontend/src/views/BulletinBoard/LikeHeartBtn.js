import React, { useState, useEffect } from "react";
import "./css/LikeHeartBtn.css";
import { CCol, CRow } from "@coreui/react";
import axios from "axios";
import Cookies from "js-cookie";

const LikeHeartBtn = ({ postNum }) => {
  const [likeActive, setLikeActive] = useState(false);
  const [clapActive, setClapActive] = useState(false);
  const [postLike, setPostLike] = useState(0);
  const [postRecommend, setPostRecommend] = useState(0);
  const staffInfo = JSON.parse(Cookies.get("staffInfo"));

  const handleLikeClick = async () => {
    try {
      const response = await axios.post("/api/bulletinboard/like", {
        postNum: postNum,
        userId: staffInfo.empId,
      });

      if (response.data.success) {
        setLikeActive(response.data.likeStatus);
        setPostLike(response.data.likeCount);
      } else {
        console.error("Failed to toggle like");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleClapClick = async () => {
    try {
      const response = await axios.post("/api/bulletinboard/clap", {
        postNum: postNum,
        userId: staffInfo.empId,
      });

      if (response.data.success) {
        setClapActive(response.data.clapStatus);
        setPostRecommend(response.data.clapCount);
      } else {
        console.error("Failed to toggle clap");
      }
    } catch (error) {
      console.error("Error toggling clap:", error);
    }
  };

  // return 부분은 동일하게 유지하되, handleClapClick 핸들러를 추가합니다.
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
