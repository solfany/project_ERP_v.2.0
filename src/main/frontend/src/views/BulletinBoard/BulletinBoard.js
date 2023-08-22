import React, { useState, useEffect } from "react";
import "./BulletinBoard.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CButton, CModal,CModalHeader, CModalTitle,CModalBody,CModalFooter, CCard, CCardBody, CCardHeader, CCol, CContainer, CBadge, CFormInput, CRow, CTable, CDropdown, CTableBody, CTableHead, CTableHeaderCell, CTableRow,CDropdownMenu,CDropdownItem,CDropdownDivider, CFormSelect} from '@coreui/react';
import { Pagination } from "antd";
import { CLoadingButton } from '@coreui/react-pro'



function BulletinBoard() {

  const columns = [
    {
      key: 'number',
      label: '글 번호',
      _props: { scope: 'col' },
    },
    {
      key: 'title',
      label: '제목',
      _props: { scope: 'col' },
    },
    {
      key: 'hashtag',
      label: '해시태그',
      _props: { scope: 'col' },
    },
    {
      key: 'id',
      label: '작성자',
      _props: { scope: 'col' },
    },
    {
      key: 'date',
      label: '작성일',
      type: 'date',
      _props: { scope: 'col' },
    },
    {
      key: 'count',
      label: '조회수',
      type: 'date',
      count: '',
      _props: { scope: 'col' },
    },
  ]
  const items = [
    {
      number: '1',
      title: '공지사항입니다. ',
      hashtag: <CBadge color="primary">primary</CBadge>,
      id: 'Otto',
      date: '2023-08-20',
      _cellProps: { title: { scope: 'row' } },
      count: '1',
    },
    {
      number: '1',
      title: '공지사항입니다. ',
      hashtag: <CBadge color="success">success</CBadge>,
      id: 'Thornton',
      date: '2023-08-20',
      _cellProps: { title: { scope: 'row' } },
      count: '1',
    },
    {
      number: '1',
      title: '공지사항입니다. ',
      hashtag:<CBadge color="danger">danger</CBadge>,
      id: 'Thornton',
      date: '2023-08-20',
      _cellProps: { title: { scope: 'row' }, class: { colSpan: 2 } },
      count: '1',
    },
    {
      number: '1',
      title: '공지사항입니다. ',
      hashtag:<CBadge color="warning">warning</CBadge>,
      id: 'Thornton',
      date: '2023-08-20',
      _cellProps: { title: { scope: 'row' }, class: { colSpan: 2 } },
      count: '1',
    },
    {
      number: '1',
      title: '공지사항입니다. ',
      hashtag: <CBadge color="info">info</CBadge>,
      id: 'Thornton',
      date: '2023-08-20',
      _cellProps: { title: { scope: 'row' }, class: { colSpan: 2 } },
      count: '1',
    },
    {
      number: '1',
      title: '공지사항입니다. ',
      hashtag: <CBadge color="light">light</CBadge>,
      id: 'Thornton',
      date: '2023-08-20',
      _cellProps: { title: { scope: 'row' }, class: { colSpan: 2 } },
      count: '1',
    },
    {
      number: '1',
      title: '공지사항입니다. ',
      hashtag: <CBadge color="dark">dark</CBadge>,
      id: 'Thornton',
      date: '2023-08-20',
      _cellProps: { title: { scope: 'row' }, class: { colSpan: 2 } },
      count: '1',
    },
  ]


// ===================================


  const [BulletinBoardPost, setMovieContent] = useState({
    title: "",
    content: "",
  });

  const [viewContent, setViewContent] = useState([
    // 미리보기용 가짜 데이터
    {
      title: "Sample Movie 1",
      content: "<p>This is the content of the sample movie 1.</p>",
    },
    {
      title: "Sample Movie 2",
      content: "<p>This is the content of the sample movie 2.</p>",
    },
  ]);


// =====================게시물 업데이트=============================

  const BulletinBoardPostUpdate = () => {
    // 실제로 서버에 데이터를 보내지 않고 미리보기용으로만 사용
    const newReview = {
      title: BulletinBoardPost.title,
      content: BulletinBoardPost.content,
    };

    // 최신 글이 상단에 표시되도록 새 글을 배열의 맨 앞에 추가
    setViewContent([newReview, ...viewContent]);

    // 입력 창 초기화
    setMovieContent({
      title: "",
      content: "",
    });

    alert("등록 완료!");
  };

  const getValue = (e) => {
    const { name, value } = e.target;
    setMovieContent({
      ...BulletinBoardPost,
      [name]: value,
    });
  };



// =========페이지네이션=================
const [current, setCurrent] = useState(3);
const onChange = (page) => {
  console.log(page);
  setCurrent(page);
};

// =============글쓰기 모달 ==============
const [visibleLg, setVisibleLg] = useState(false);
const [stateO, setStateO] = useState(false)



// -----------버튼-------------










  return (
    <div className="App">

      <CContainer className="BullentinBoardConta">
              <h1>게시판</h1>



        <CRow>
          <CCol md={12} >
            <CCard>
              <CCardHeader>
                 <CRow>
                 <CCol md={2}>

                 <CFormSelect 
  aria-label="Default select example"
  options={[
    '카테고리 선택',
    { label: '전체', value: '1' },
    { label: '공지', value: '2' },
  { label: '사내', value: '3' /*, disabled: true - 비활성화 */}
  ]}
/>
</CCol>

                    <CCol md={9}>
                        <CFormInput type="text" id="text" placeholder="검색어를 입력하세요" />
                    </CCol>
                        <CCol xm="auto">
                          <CButton color="light" type="submit" className="mb-32">검색 🔍</CButton></CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
              <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                <CTable>

                  <CTableBody>
                    <CTableRow>
                      <CTable columns={columns} items={items} />

                       </CTableRow>
                  </CTableBody>

                  <div className="BulletinBoardPostBtn">
                  <CButton color="light" onClick={() => setVisibleLg(!visibleLg)}>게시글 작성하기</CButton>
                  </div>
                  <CModal size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
        
        
        <CModalHeader>
        <CModalTitle>글쓰기</CModalTitle>
        
      </CModalHeader>
      <CModalBody>

{/* 모달 내용 넣기 */}
<CRow className="BulletinBoardModalInputSize">
  <CCol md={3}>
<CFormSelect 
  aria-label="Default select example"
  options={[
    '카테고리 선택',
    { label: '전체', value: '1' },
    { label: '공지', value: '2' },
  { label: '사내', value: '3' /*, disabled: true - 비활성화 */}
  ]}
/>
</CCol>
<CCol  md={9}>
        <CFormInput
          className="title-input"
          type="text"
          placeholder="제목"
          onChange={getValue}
          name="title"
          value={BulletinBoardPost.title}
        />
        </CCol>
        </CRow>



        <CKEditor
          editor={ClassicEditor}
          data={BulletinBoardPost.content}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            setMovieContent({
              ...BulletinBoardPost,
              content: data,
            });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
<div className="d-grid gap-2 d-md-flex justify-content-md-end BulletinBoardModalBtn">

<button type="submit" onClick={""} class="btn btn-outline-warning me-md-2 ">취소하기 </button> 
<button type="submit" onClick={BulletinBoardPostUpdate} class="btn btn-outline-primary me-md-2 ">등록하기 </button>

</div>

      </CModalBody>
    </CModal>
                  <Pagination current={current} onChange={onChange} total={50} />
                  </CTable>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

      </CContainer>








{/* ====================================== */}

      <div className="movie-container">
        {viewContent.map((element, index) => (
          <div key={index} style={{ border: "1px solid #333" }}>
            <h2>{element.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: element.content }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BulletinBoard;

// import React from "react";
// import { useState, useEffect } from "react";
// import "./App.css";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// // import ReactHtmlParser from "react-html-parser";
// import Axios from "axios";

// function BulletinBoard() {
//   const [BulletinBoardPost, setMovieContent] = useState({
//     title: "",
//     content: "",
//   });

//   const [viewContent, setViewContent] = useState([]);

//   useEffect(() => {
//     Axios.get("http://localhost:8000/api/get").then((response) => {
//       setViewContent(response.data);
//     });
//   }, [viewContent]);

//   const submitReview = () => {
//     Axios.post("http://localhost:8000/api/insert", {
//       title: BulletinBoardPost.title,
//       content: BulletinBoardPost.content,
//     }).then(() => {
//       alert("등록 완료!");
//     });
//   };

//   const getValue = (e) => {
//     const { name, value } = e.target;
//     setMovieContent({
//       ...BulletinBoardPost,
//       [name]: value,
//     });
//   };

//   return (
//     <div className="App">
//       <h1>Movie Review</h1>
//       <div className="movie-container">
//         {viewContent.map((element) => (
//           <div style={{ border: "1px solid #333" }}>
//             <h2>{element.title}</h2>
//             {/* <div>{ReactHtmlParser(element.content)}</div> */}
//           </div>
//         ))}
//       </div>
//       <div className="form-wrapper">
//         <input
//           className="title-input"
//           type="text"
//           placeholder="제목"
//           onChange={getValue}
//           name="title"
//         />
//         <CKEditor
//           editor={ClassicEditor}
//           data="<p>Hello from CKEditor 5!</p>"
//           onReady={(editor) => {
//             // You can store the "editor" and use when it is needed.
//             console.log("Editor is ready to use!", editor);
//           }}
//           onChange={(event, editor) => {
//             const data = editor.getData();
//             console.log({ event, editor, data });
//             setMovieContent({
//               ...BulletinBoardPost,
//               content: data,
//             });
//           }}
//           onBlur={(event, editor) => {
//             console.log("Blur.", editor);
//           }}
//           onFocus={(event, editor) => {
//             console.log("Focus.", editor);
//           }}
//         />
//       </div>
//       <button className="submit-button" onClick={submitReview}>
//         입력
//       </button>
//     </div>
//   );
// }

// export default BulletinBoard;





// ============ 솔비  쇼핑 장바구니 ===============

// 해시태그 뱃지 
{/* <span class="badge rounded-pill bg-primary">Primary</span>
<span class="badge rounded-pill bg-secondary">Secondary</span>
<span class="badge rounded-pill bg-success">Success</span>
<span class="badge rounded-pill bg-danger">Danger</span>
<span class="badge rounded-pill bg-warning text-dark">Warning</span>
<span class="badge rounded-pill bg-info text-dark">Info</span>
<span class="badge rounded-pill bg-light text-dark">Light</span>
<span class="badge rounded-pill bg-dark">Dark</span> */}