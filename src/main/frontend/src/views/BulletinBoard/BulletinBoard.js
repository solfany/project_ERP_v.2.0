import React, { useState, useEffect, useRef, Route, Router } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Navigate, useNavigate, useHistory } from "react-router-dom"; // useHistory를 정확하게 가져옵니다
import { Pagination, message } from "antd";
import FormattedDate from "./FormattedDate";
import HashTagCustom from "./HashTagCustom";
import Cookies from "js-cookie";

import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CBadge,
  CFormInput,
  CRow,
  CTable,
  CDropdown,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CDropdownItem,
  CDropdownDivider,
  CFormSelect,
} from "@coreui/react";
// =========컴포넌트=========
import "./css/BulletinBoard.css";
import BulletinBoardHashTag from "./BulletinBoardHashTag"; // Make sure the path is correct
// =============backend===============
import axios from "axios";
import BulletinBoardModal from "./BulletinBoardModal";

function BulletinBoard() {
  const [bulletinBoardPost, setBulletinBoardPost] = useState([]); // 변경: 배열로 초기화
  const navigate = useNavigate(); //게시글 페이지로 이동
  const [postCategory, setPostCategory] = useState();
  const [searchTerm, setSearchTerm] = useState(""); //검색창
  const [searchedPosts, setSearchedPosts] = useState(); //검색창
  const [current, setCurrent] = useState(1);
  const [currentPagePosts, setCurrentPagePosts] = useState([]);
  const postsPerPage = 5;
  const staffInfo = JSON.parse(Cookies.get("staffInfo"));
  console.log(staffInfo);
  // 토큰
  const onChange = (page) => {
    setCurrent(page);
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const filteredPosts = bulletinBoardPost.filter((post) =>
      post.postTitle.includes(searchTerm)
    );
    setCurrentPagePosts(filteredPosts.slice(startIndex, endIndex));
  };

  useEffect(() => {
    onChange(1);
  }, [bulletinBoardPost, searchTerm]);

  // =====================backend==========================

  // =====================pages====================

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = () => {
    const searchedPosts = bulletinBoardPost.filter((post) =>
      post.postTitle.includes(searchTerm)
    );
    setSearchedPosts(searchedPosts);
  };
  useEffect(() => {
    setSearchedPosts(bulletinBoardPost);
  }, [bulletinBoardPost]);

  message.config({
    top: 130, // 메시지가 나타날 위치 (상단으로부터의 거리)
    duration: 4, // 메시지가 보여질 시간 (초 단위)
    maxCount: 3, // 동시에 보여질 최대 메시지 수
    rtl: false, // RTL (오른쪽에서 왼쪽) 모드 활성화 여부
    prefixCls: "my-message", // 커스텀 클래스명 프리픽스
  });

  // 백엔드단에서 리스트 객체를 가져오는 부분
  useEffect(() => {
    axios
      .get("/api/bulletinboard")
      .then((res) => {
        const sortedData = res.data.sort(
          (a, b) => new Date(b.postDate) - new Date(a.postDate)
        );
        setBulletinBoardPost(sortedData);
        message.success("데이터를 성공적으로 갱신하였습니다.");
      })
      .catch((error) =>
        message.error("데이터를 갱신하는 도중 에러가 발생하였습니다.")
      );
  }, []);

  // 게시판 카테고리
  const categoryOptions = [
    { label: "전체", key: "전체 게시판", value: "CategoryAll" },
    { label: "공지사항", key: "공지사항", value: "CategoryNotice" },
    { label: "사내게시판", key: "사내게시판", value: "Categoryemployee" },
    // ... 다른 카테고리 옵션 ...
  ];

  // 선택한 카테고리의 label 값
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setPostCategory(selectedCategory);
    if (selectedCategory === "CategoryAll") {
      setCurrentPagePosts(bulletinBoardPost.slice(0, postsPerPage));
    } else {
      const filteredPosts = bulletinBoardPost.filter(
        (post) =>
          post.postCategory === selectedCategory ||
          selectedCategory === "전체 게시판"
      );
      setCurrentPagePosts(filteredPosts.slice(0, postsPerPage));
    }
  };

  // 조회수 카운트
  const updatePostCount = async (postNum, postCountNum) => {
    try {
      const response = await axios.put(`/api/bulletinboard/update/${postNum}`, {
        postCountNum: postCountNum + 1,
      });
      if (response.status === 200) {
        console.log("조회수 업데이트 성공");

        const updatedBulletinBoardPost = bulletinBoardPost.map((post) => {
          if (post.postNum === postNum) {
            return { ...post, postCountNum: postCountNum + 1 };
          } else {
            return post;
          }
        });

        console.log(updatedBulletinBoardPost); // Moved this line here
        setBulletinBoardPost(updatedBulletinBoardPost);
      }
    } catch (error) {
      console.error("조회수 업데이트 실패", error);
    }
  };

  return (
    <CContainer className="BullentinBoardConta">
      <h1>게시판</h1>

      <CRow>
        <CCol md={12}>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol md={2}>
                  <CFormSelect
                    aria-label="Default select example"
                    options={categoryOptions.map((option) => ({
                      label: option.label,
                      value: option.key,
                    }))}
                    onChange={handleCategoryChange}
                    value={postCategory}
                  />
                </CCol>

                <CCol md={10}>
                  <CFormInput
                    type="text"
                    placeholder="검색어를 입력하세요"
                    onChange={handleSearchTermChange}
                  />
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <div
                style={{
                  maxHeight: "calc(100vh - 200px)",
                  overflowY: "auto",
                }}
              >
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>글 번호</CTableHeaderCell>
                      <CTableHeaderCell>카테고리</CTableHeaderCell>
                      <CTableHeaderCell>제목</CTableHeaderCell>
                      <CTableHeaderCell>해시태그</CTableHeaderCell>
                      <CTableHeaderCell>작성자</CTableHeaderCell>
                      <CTableHeaderCell>작성일</CTableHeaderCell>
                      <CTableHeaderCell>조회수</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {currentPagePosts.map((post) => (
                      <CTableRow
                        key={post.postNum}
                        onClick={() => {
                          navigate(
                            `/BulletinBoard/BulletinBoardPages/${post.postNum}`
                          );
                          updatePostCount(post.postNum, post.postCountNum);
                        }}
                      >
                        <CTableDataCell>{post.postNum}</CTableDataCell>
                        <CTableDataCell>{post.postCategory}</CTableDataCell>
                        <CTableDataCell>{post.postTitle}</CTableDataCell>

                        <CTableDataCell>
                          <HashTagCustom hashtagNames={post.hashtagName} />
                        </CTableDataCell>

                        <CTableDataCell>{post.empId}</CTableDataCell>
                        <CTableDataCell>
                          <FormattedDate date={post.postDate} />
                        </CTableDataCell>
                        <CTableDataCell>{post.postCountNum}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
                <BulletinBoardModal />

                <Pagination
                  current={current}
                  onChange={onChange}
                  total={
                    Math.ceil(
                      bulletinBoardPost.filter((post) =>
                        post.postTitle.includes(searchTerm)
                      ).length / postsPerPage
                    ) * 10
                  }
                />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
}

export default BulletinBoard;
