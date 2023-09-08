import "./css/BulletinBoard.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import BulletinBoardHashTag from "./BulletinBoardHashTag";

import axios from "axios";

import {
  CButton,
  CFormTextarea,
  CCard,
  CCol,
  CForm,
  CBadge,
  CFormSelect,
  CRow,
  CFormInput,
} from "@coreui/react";
import { Input, Pagination } from "antd";
import LikeHeartBtn from "./LikeHeartBtn"; // Make sure the path is correct

const BulletinBoardPagesEdit = (props) => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [hashtagName, setHashtagName] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const [selectedHashTags, setSelectedHashTags] = useState([]);

  //게시물 불러오기
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/bulletinboard/BulletinBoardPages/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        setPostTitle(data.postTitle);
        setPostContent(data.postContent);
        setHashtagName(data.hashtagName);
        setPostCategory(data.postCategory);
        setSelectedHashTags(data.hashtagName.split(","));
      });
  }, [id]);

  const categoryOptions = [
    { label: "공지사항", key: "공지사항", value: "CategoryNotice" },
    { label: "사내게시판", key: "사내게시판", value: "Categoryemployee" },
  ];

  const handleCategoryChange = (event) => {
    const selectedLabel = event.target.value;
    setPostCategory(selectedLabel);
  };

  const handleHashTagChange = (newHashTags) => {
    setSelectedHashTags(newHashTags);
  };

  const handlePostUpdate = async () => {
    try {
      const updatedPost = {
        postTitle: postTitle,
        postContent: postContent,
        hashtagName: selectedHashTags.join(","),
        postCategory: postCategory,
        postDateEdit: new Date(),
      };

      // Send the updatedPost data to the backend API
      await axios.put(
        `/api/bulletinboard/BulletinBoardPagesEdit/update/${id}`,
        updatedPost
      );

      alert("게시물이 정상적으로 수정되었습니다.");

      navigate(`/BulletinBoard/BulletinBoardPages/${id}`);
    } catch (error) {
      console.error("There was an error updating the post!", error);
    }
  };

  return (
    <>
      <Container className="BulletinBoardPages-Container">
        <CCard className="BulletinBoardPages-CCard">
          <CRow className="BulletinBoardModalInputSize">
            <CCol md={3}>
              <CFormSelect
                aria-label="카테고리"
                options={categoryOptions.map((option) => ({
                  label: option.label,
                  value: option.label,
                }))}
                onChange={handleCategoryChange}
                value={postCategory}
              />
            </CCol>
            <CCol md={9}>
              <CFormInput
                className="title-input"
                type="text"
                placeholder="제목"
                name="postTitle"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
              />
            </CCol>
          </CRow>

          <CKEditor
            editor={ClassicEditor}
            data={postContent}
            value={postContent}
            onReady={(editor) => {
              console.log("에디터가 준비되었습니다!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setPostContent(data);
            }}
          />

          <BulletinBoardHashTag
            onHashTagChange={handleHashTagChange}
            value={hashtagName}
          />

          <div className="d-grid gap-2 d-md-flex justify-content-md-end BulletinBoardModalBtn">
            <button
              type="button"
              className="btn btn-outline-warning me-md-2"
              onClick={() => {
                navigate(`/BulletinBoard/BulletinBoardPages/${id}`);
              }}
            >
              취소하기
            </button>
            <button
              className="btn btn-outline-primary me-md-2"
              onClick={handlePostUpdate}
            >
              수정하기
            </button>
          </div>
        </CCard>
      </Container>
    </>
  );
};
export default BulletinBoardPagesEdit;
