import React, { useState, useEffect } from "react";
import "./App.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function BulletinBoard() {
  const [movieContent, setMovieContent] = useState({
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

  const submitReview = () => {
    // 실제로 서버에 데이터를 보내지 않고 미리보기용으로만 사용
    const newReview = {
      title: movieContent.title,
      content: movieContent.content,
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
      ...movieContent,
      [name]: value,
    });
  };

  return (
    <div className="App">
      <h1>Movie Review</h1>
      <div className="form-wrapper">
        <input
          className="title-input"
          type="text"
          placeholder="제목"
          onChange={getValue}
          name="title"
          value={movieContent.title}
        />
        <CKEditor
          editor={ClassicEditor}
          data={movieContent.content}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            setMovieContent({
              ...movieContent,
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
        <button className="submit-button" onClick={submitReview}>
          입력
        </button>
      </div>
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
//   const [movieContent, setMovieContent] = useState({
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
//       title: movieContent.title,
//       content: movieContent.content,
//     }).then(() => {
//       alert("등록 완료!");
//     });
//   };

//   const getValue = (e) => {
//     const { name, value } = e.target;
//     setMovieContent({
//       ...movieContent,
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
//               ...movieContent,
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
