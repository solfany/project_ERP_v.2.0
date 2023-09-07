import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CCol,
  CFormInput,
  CRow,
  CFormSelect,
} from "@coreui/react";
import axios from "axios";
import BulletinBoardHashTag from "./BulletinBoardHashTag";
import Cookies from "js-cookie";

function BulletinBoardModal() {
  const [visibleLg, setVisibleLg] = useState(false);
  const [empNum, setEmpNum] = useState("");
  const [empId, setEmpId] = useState("");
  const [postContent, setPostContent] = useState("");
  const [HashtagName, setHashtagName] = useState("");
  const [postCountNum, setPostCountNum] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const [selectedHashTags, setSelectedHashTags] = useState([]);
  const [email, setEmail] = useState("");
  const [hashtagDate, setHashtagDate] = useState("");
  const staffInfo = JSON.parse(Cookies.get("staffInfo"));
  console.log(staffInfo);
  const handleBulletinBoardPostUpdate = async () => {
    try {
      const newPost = {
        empNum: staffInfo.empNum, // staffInfo에서 empNum 가져옴
        empId: staffInfo.empId, // staffInfo에서 empId 가져옴
        postTitle: postTitle,
        postContent: postContent,
        hashtagName: selectedHashTags.join(","), // Join selectedHashTags into a string
        postDate: new Date(),
        postCountNum: 0,
        postLike: 0,
        postRecommend: 0,
        postCategory: postCategory,
        email: staffInfo.email, // staffInfo에서 email 가져옴
        hashtagDate: new Date(),
      };
      console.log("등록하기 버튼 클릭됨");

      // Send the newPost data to the backend API
      const response = await axios.post("/api/bulletinboard/add", newPost);

      // Clear the form fields after successful submission
      setEmpNum("");
      setEmpId("");
      setEmail("");
      setPostTitle("");
      setPostContent("");
      setHashtagName("");
      setPostCountNum("");
      setPostCategory("");
      setHashtagDate("");

      alert("정상 등록 되었습니다.");

      // Close the modal
      setVisibleLg(false);

      console.log(newPost);
      window.location.reload();
      // Perform any other actions you need after successful submission
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  const handleHashTagChange = (newHashTags) => {
    setSelectedHashTags(newHashTags);
    console.log("Selected Hash Tags:", newHashTags);
  };

  const categoryOptions = [
    { label: "전체", key: "전체 게시판", value: "CategoryAll" },
    { label: "공지사항", key: "공지사항", value: "CategoryNotice" },
    { label: "사내게시판", key: "사내게시판", value: "Categoryemployee" },
    // ... 다른 카테고리 옵션 ...
  ];

  const handleCategoryChange = (event) => {
    const selectedLabel = event.target.value;
    setPostCategory(selectedLabel);
  };

  return (
    <>
      <CCol className="BulletinBoardPostBtn">
        <CButton color="light" onClick={() => setVisibleLg(!visibleLg)}>
          게시글 작성하기
        </CButton>
      </CCol>
      <CModal size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
        <CModalHeader>
          <CModalTitle>글쓰기</CModalTitle>
        </CModalHeader>

        <CModalBody>
          <CRow className="BulletinBoardModalInputSize">
            <CCol md={3}>
              <CFormSelect
                aria-label="카테고리"
                options={categoryOptions.map((option) => ({
                  label: option.label,
                  value: option.label,
                }))}
                onChange={handleCategoryChange}
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
            onReady={(editor) => {
              console.log("에디터가 준비되었습니다!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log("에디터의 내용을 가져옵니다", {
                event,
                editor,
                data,
              });
              setPostContent(data);
            }}
          />

          <BulletinBoardHashTag
            onHashTagChange={handleHashTagChange}
            value={HashtagName}
          />

          <div className="d-grid gap-2 d-md-flex justify-content-md-end BulletinBoardModalBtn">
            <button
              type="button"
              onClick={() => setVisibleLg(false)}
              className="btn btn-outline-warning me-md-2"
            >
              취소하기
            </button>
            <button
              type="button"
              onClick={handleBulletinBoardPostUpdate}
              className="btn btn-outline-primary me-md-2"
            >
              등록하기
            </button>
          </div>
        </CModalBody>
      </CModal>
    </>
  );
}

export default BulletinBoardModal;
