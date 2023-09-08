import "./css/BulletinBoard.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import FormattedDate from "./FormattedDate";
import HashTagCustom from "./HashTagCustom";
import BulletinBoardPagesEdit from "./BulletinBoardPagesEdit";
import { CommentInput, SingleComment } from "./BulletinBoardComment"; // 경로는 해당 컴포넌트가 있는 위치에 따라 변경해야합니다.

import axios from "axios";

import {
  CButton,
  CFormTextarea,
  CCard,
  CCol,
  CForm,
  CBadge,
  CRow,
} from "@coreui/react";
import { Input, Pagination } from "antd";
import LikeHeartBtn from "./LikeHeartBtn"; // Make sure the path is correct
import { useLocation } from "react-router";
import BulletinBoard from "./BulletinBoard";
import { Alert } from "@coreui/coreui";
//댓글 불러오기
import Cookies from "js-cookie";

const BulletinBoardPages = (props) => {
  //게시물 불러오기
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const staffInfo = JSON.parse(Cookies.get("staffInfo"));
  console.log(staffInfo);
  //댓글 불러오기
  useEffect(() => {
    fetch(`/api/bulletinboard/BulletinBoardPages/${id}/comments`)
      .then((response) => response.json())
      .then((comment) => {
        console.log(id);

        setComments(comment);
      });
  }, [id]);

  //게시물 데이터 불러오기
  useEffect(() => {
    fetch(`/api/bulletinboard/BulletinBoardPages/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post) return <div>Loading...</div>;

  // 게시물 삭제 신로직
  const handleDelete = async () => {
    try {
      await axios.delete(
        `/api/bulletinboard/BulletinBoardPages/${post.postNum}`
      );
      if (!confirm("게시물을 삭제하시겠습니까?")) {
        alert("취소 되었습니다.");
      } else {
        alert("삭제 되었습니다.");
      }

      navigate("/BulletinBoard/BulletinBoard");
    } catch (error) {
      console.error("삭제 불가", error);
    }
  };

  return (
    <Container className="BulletinBoardPages-Container">
      <CCard className="BulletinBoardPages-CCard">
        <Row>
          <CCol md={9} className="BulletinBoardPages-Center">
            <h1>
              {post.postTitle}
              <h4>
                <CBadge color="secondary">{post.postCategory} </CBadge>
              </h4>
            </h1>
          </CCol>
          <div className="toptext"></div>
          <pre>
            작성일: [ <FormattedDate date={post.postDate} /> ] 조회수:{" "}
            {post.postCountNum}
          </pre>
        </Row>

        <Row className="BulletinBoardPages-group">
          <CCol
            md={3}
            lg={3}
            className="order-md-last BulletinBoardPages-userInfo"
          >
            <aside>
              <div>
                <img
                  style={{ width: "10em", height: "10em" }}
                  id="image"
                  alt="User"
                  src="https://png.pngtree.com/png-vector/20191115/ourmid/pngtree-beautiful-profile-line-vector-icon-png-image_1990469.jpg"
                />
              </div>
              <p>
                <span id="nickname"> 유저 아이디 : {post.empId}</span>
              </p>
              <p>
                email :
                <a id="email" href="mailto:djkehh@gmail.com">
                  {post.email}
                </a>
              </p>
              <p>
                <span id="hashtag" className="badge mx-1">
                  <a className="text-reset">
                    <HashTagCustom hashtagNames={post.hashtagName} />
                  </a>
                </span>
              </p>
            </aside>
          </CCol>

          <CCol md={9} lg={9} className="BulletinBoardPages-Content">
            <p dangerouslySetInnerHTML={{ __html: post.postContent }}></p>
          </CCol>
        </Row>
        <CCol>
          <LikeHeartBtn postNum={post.postNum} empNum={staffInfo.empNum} />
        </CCol>

        <div className="d-grid gap-2 d-md-flex justify-content-md-end BulletinBoardPages-AddDelBtn">
          <CButton color="danger" role="button" onClick={handleDelete}>
            삭제
          </CButton>

          <CButton
            color="success"
            role="button"
            onClick={() => {
              navigate(`/BulletinBoard/BulletinBoardPagesEdit/${post.postNum}`);
            }}
          >
            수정
          </CButton>
        </div>
        {/*첫댓글 작성 폼*/}
        <CommentInput postNum={post.postNum} />

        <CRow>
          <CCol md={12} lg={12} className="mb-4 BulletinBoardPages-Comment">
            <ul>
              {Array.isArray(comments) &&
                comments.map((comment) => (
                  <SingleComment
                    comment={comment}
                    postNum={post.postNum}
                    key={comment.parentCommentId}
                  />
                ))}
            </ul>
          </CCol>
        </CRow>

        <CRow>
          <CCol md={12}>
            <nav
              id="pagination"
              aria-label="Page navigation"
              className="BulletinBoardPages-PageNation"
            >
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo; 이전 글 </span>
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true"> 다음 글 &raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </CCol>
        </CRow>
      </CCard>
    </Container>
  );
};

export default BulletinBoardPages;
