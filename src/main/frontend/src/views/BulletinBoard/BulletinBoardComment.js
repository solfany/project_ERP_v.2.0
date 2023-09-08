import React, { useState, useEffect, Children } from "react";
import axios from "axios";
import { CRow, CCol, CButton, CFormTextarea, CForm } from "@coreui/react";
import { Input, Pagination } from "antd";
import FormattedDate from "./FormattedDate";
import Cookies from "js-cookie";
import "./css/BulletinBoardComment.css";

export const CommentInput = ({ postNum }) => {
  const [comment, setComment] = useState("");
  const staffInfo = JSON.parse(Cookies.get("staffInfo"));
  console.log(staffInfo);
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  // 부모댓글 입력 로직
  const handleSubmitComment = async () => {
    try {
      const data = {
        commentDate: new Date(),
        postNum: postNum,
        empId: staffInfo.empId, // staffInfo에서 empId 가져옴
        empNum: staffInfo.empNum, // staffInfo에서 empNum 가져옴
        email: staffInfo.email, // staffInfo에서 email 가져옴
        commentContent: comment,
      };

      const response = await axios.post(
        `api/bulletinboard/BulletinBoardPages/addParentComment/${postNum}`,
        data
      );

      setComment("");
      alert("정상 등록 되었습니다.");
      location.reload();
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <CRow className="BulletinBoardPages-MainComment">
      <CCol md={9} sm="auto">
        <input type="hidden" className="article-id" />
        <input type="hidden" className="parent-comment-id" />
        <CFormTextarea
          className="form-control comment-textbox BulletinBoardPages-MainCommentBox"
          placeholder="댓글 작성시 상대방에 대한 매너를 지켜주세요. "
          rows="4"
          required
          value={comment}
          onChange={handleCommentChange}
        />
      </CCol>
      <CCol md={3} sm="auto">
        <CButton
          className="form-control mt-2"
          color="info"
          type="button"
          onClick={handleSubmitComment}
        >
          쓰기
        </CButton>
      </CCol>
    </CRow>
  );
};

// CommentContent 컴포넌트 내에서 수정 기능 추가
const CommentContent = ({ author, time, text, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEditChange = (event) => {
    setEditedText(event.target.value);
  };

  const handleUpdate = () => {
    onUpdate(editedText); // onUpdate 함수를 통해 변경된 내용을 상위 컴포넌트에 전달
    setEditing(false);
  };

  return (
    <CCol md={10} xs="auto">
      <strong>{author} </strong>
      <small>
        <time>{time}</time>
      </small>
      {editing ? (
        <>
          <CFormTextarea value={editedText} onChange={handleEditChange} />
          <CButton
            className="BulletinBoardPages-DelBtn"
            color="success"
            variant="ghost"
            onClick={handleUpdate}
          >
            저장
          </CButton>
          <CButton
            className="BulletinBoardPages-DelBtn"
            color="secondary"
            variant="ghost"
            onClick={() => setEditing(false)}
          >
            취소
          </CButton>
        </>
      ) : (
        <>
          <p className="mb-1">{text}</p>
          <CButton
            className="BulletinBoardPages-DelBtn"
            color="primary"
            variant="ghost"
            onClick={() => setEditing(true)}
          >
            수정
          </CButton>
        </>
      )}
    </CCol>
  );
};

// 부모 댓글 삭제
function deleteParentComment(postNum, commentId) {
  fetch(
    `api/bulletinboard/BulletinBoardPages/${postNum}/deleteParentComment/${commentId}`,
    {
      method: "DELETE",
    }
  )
    .then((response) => {
      if (response.ok) {
        alert("부모 댓글이 성공적으로 삭제되었습니다."); // 정상 삭제 알림
        location.reload();
        return;
      } else {
        throw new Error("Failed to delete the parent comment.");
      }
    })
    .then((data) => {
      if (data && !data.success) {
        alert("부모 댓글 삭제 중 오류가 발생했습니다: " + data.message);
        console.log("postNum", postNum, "commentId:", commentId);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      console.log("postNum", postNum, "commentId:", commentId);

      if (error.message !== "Failed to delete the parent comment.") {
        alert("댓글 삭제 중 오류가 발생했습니다.");
      }
    });
}

// 자식 댓글 삭제
function deleteChildComment(postNum, commentId) {
  console.log("Received commentId:", commentId); // 여기서 확인

  fetch(
    `api/bulletinboard/BulletinBoardPages/${postNum}/deleteChildComment/${commentId}`,
    {
      method: "DELETE",
    }
  )
    .then((response) => {
      if (response.ok) {
        alert("자식 댓글이 성공적으로 삭제되었습니다."); // 정상 삭제 알림
        location.reload();
        return;
      } else {
        throw new Error("Failed to delete the comment.");
      }
    })
    .then((data) => {
      if (data && !data.success) {
        alert("자식 댓글 삭제 중 오류가 발생했습니다: " + data.message);
      }
    })
    .catch((error) => {
      if (error.message !== "Failed to delete the comment.") {
        alert("댓글 삭제 중 오류가 발생했습니다.");
      }
    });
}
const handleUpdateComment = (updatedText) => {
  // 여기에서 API를 호출하여 댓글 내용을 업데이트
  console.log("Updated text:", updatedText);
  // 예를 들면, axios.put() 메서드를 사용하여 댓글을 업데이트
};

// 부모 삭제 버튼
const ParentCommentActions = ({ postNum, commentId }) => (
  <CCol
    md={2}
    xs="auto"
    className="col-2 mb-3 align-self-center BulletinBoardPages-DelBtn-Layout"
  >
    <CButton
      className="BulletinBoardPages-DelBtn"
      color="danger"
      variant="ghost"
      onClick={() => deleteParentComment(postNum, commentId)}
    >
      삭제
    </CButton>
  </CCol>
);

// 자식 삭제 버튼
const ChildCommentActions = ({
  postNum,
  commentId,
  author,
  time,
  text,
  onUpdate,
}) => {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEditChange = (event) => {
    setEditedText(event.target.value);
  };

  const handleUpdate = () => {
    onUpdate(editedText);
    setEditing(false);
  };

  return (
    <CCol
      md={10}
      xs="auto"
      className="col-2 mb-3 align-self-center BulletinBoardPages-DelBtn-Layout"
    >
      <strong>{author} </strong>
      <small>
        <time>{time}</time>
      </small>
      {editing ? (
        <>
          <CFormTextarea value={editedText} onChange={handleEditChange} />
          <CButton color="success" onClick={handleUpdate}>
            저장
          </CButton>
          <CButton color="secondary" onClick={() => setEditing(false)}>
            취소
          </CButton>
        </>
      ) : (
        <>
          <p className="mb-1">{text}</p>
          <CButton
            className="BulletinBoardPages-DelBtn"
            color="danger"
            variant="ghost"
            onClick={() => deleteChildComment(postNum, commentId)}
          >
            삭제
          </CButton>
        </>
      )}
    </CCol>
  );
};

// 자식 댓글 등록 폼
const ReplyForm = ({ postNum, parentComment }) => {
  const [reply, setReply] = React.useState("");
  const staffInfo = JSON.parse(Cookies.get("staffInfo"));

  const handleReplyChange = (event) => {
    setReply(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const data = {
        commentDate: new Date(),
        postNum: postNum,
        parentCommentId: parentComment, // 수정된 부분
        empId: staffInfo.empId, // staffInfo에서 empId 가져옴
        empNum: staffInfo.empNum, // staffInfo에서 empNum 가져옴
        email: staffInfo.email, // staffInfo에서 email 가져옴
        commentContent: reply,
      };

      const response = await axios.post(
        `api/bulletinboard/BulletinBoardPages/addChildComment/${postNum}`,
        data
      );

      setReply("");
      alert("정상 등록 되었습니다.");
      location.reload();
    } catch (error) {
      console.error("에러 발생:", error);
      console.log(parentComment);
    }
  };

  // ... 나머지 코드 ...

  return (
    <li className="child-comment">
      <input type="hidden" className="article-id" />
      <div className="row">
        <div className="col-md-10 col-lg-9">
          <details>
            <summary>자식 댓글 달기</summary>
            <CForm className="comment-form">
              <input type="hidden" className="article-id" />
              <input type="hidden" className="parent-comment-id" />
              <CFormTextarea
                className="form-control comment-textbox"
                placeholder="댓글 쓰기.."
                rows="2"
                required
                value={reply}
                onChange={handleReplyChange}
              />
              <CButton
                className="form-control btn btn-primary mt-2"
                color="info"
                type="button"
                onClick={handleSubmit}
              >
                쓰기
              </CButton>
            </CForm>
          </details>
        </div>
        <CCol
          md={2}
          xs="auto"
          className="BulletinBoardPages-DelBtn-Layout"
        ></CCol>
      </div>
    </li>
  );
};

// 전체 댓글 폼
// SingleComment 컴포넌트
export const SingleComment = ({ comment, postNum }) => {
  const { commentContent, commentDate, empId, commentId, childComments } =
    comment;

  return (
    <div className="comment">
      <CForm>
        <Input type="hidden" />
        <div className="comment-content">
          <CRow>
            {/* 부모 댓글 */}
            <CommentContent
              author={empId}
              time={<FormattedDate date={commentDate} />}
              text={commentContent}
              onUpdate={handleUpdateComment}
            />
            <ParentCommentActions postNum={postNum} commentId={commentId} />
          </CRow>
          <ReplyForm postNum={postNum} parentComment={commentId} />
        </div>
      </CForm>
      {/* 자식 댓글들 */}
      {childComments && childComments.length > 0 ? (
        <ul>
          {childComments.map((childComment, index) => {
            console.log("childComment:", childComment); // 여기서 로그를 찍어서 확인

            return (
              <li key={index}>
                <CRow>
                  <CommentContent
                    author={childComment.empId}
                    time={<FormattedDate date={childComment.commentDate} />}
                    text={childComment.commentContent}
                  />
                  <ChildCommentActions
                    postNum={postNum}
                    commentId={childComment.commentId}
                  />
                </CRow>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};
