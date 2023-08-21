import React from "react";
import "./BulletinBoard.css";
import { Container, Col, Row } from "react-bootstrap";
import { CButton, CFormTextarea, CCard, CCol, CForm, CRow } from "@coreui/react";
import { Input, Pagination } from "antd";

function BulletinBoardPages(props) {
  const onChange = (page) => {
    console.log(page);
  };

  return (
    <Container className="BulletinBoardPages-Container">
      <CCard className="BulletinBoardPages-CCard">
        <Row>
          <CCol md={12} className="BulletinBoardPages-Center">
            <h1>첫번째 글</h1>
          </CCol>
        </Row>

        <Row className="BulletinBoardPages-group">
          <CCol md={3} lg={3} className="order-md-last BulletinBoardPages-userInfo">
            <aside>
              <div>
                <img id="image" alt="User" src="[이미지 주소]" />
              </div>
              <p>
                <span id="nickname">솔비</span>
              </p>
              <p>
                <a id="email" href="mailto:djkehh@gmail.com">
                  solfany1999@mail.com
                </a>
              </p>
              <p>
                <time id="created-at" dateTime="2022-01-01">
                  2023-8-20
                </time>
              </p>
              <p>
                <span id="hashtag" className="badge text-bg-secondary mx-1">
                  <a className="text-reset">#java</a>
                </span>
              </p>
            </aside>
          </CCol>

          <CCol md={9} lg={9} className="BulletinBoardPages-Content">
            <pre>본문 내용</pre>
          </CCol>
        </Row>

        <div className="d-grid gap-2 d-md-flex justify-content-md-end BulletinBoardPages-AddDelBtn">
          <CButton color="danger"  role="button" type="submit">
            삭제
          </CButton>
          <CButton
            color="success"
            role="button"
            type="submit"
          >
            수정
          </CButton>
        </div>

        <CRow className="BulletinBoardPages-MainComment">
        <CCol md={10} sm="auto">

            <input type="hidden" className="article-id" />
            <input type="hidden" className="parent-comment-id" />
            <CFormTextarea
              className="form-control comment-textbox BulletinBoardPages-MainCommentBox"
              placeholder="댓글 쓰기.."
              rows="4"
              required
            />
       </CCol>
            
            <CCol md={2}sm="auto">
            <CButton
              className="form-control btn btn-primary mt-2"
              color="light"
              type="submit"
            >
              쓰기
            </CButton>
            </CCol>
          </CRow>

          <CRow>



          <CCol md={12} lg={12} className="mb-4 BulletinBoardPages-Comment">
            

          <ul className={props.isChild ? "child-comment-list" : "parent-comment-list"}>
      <li className="comment">
        <CForm>
          <Input type="hidden" />
          <div className="comment-content">
            <CRow>
              <Col md={10} xs="auto">
                <strong>송비</strong>
                <small><time>2022-01-01</time></small>
                <p className="mb-1">
                  어쩌ㅓ구 저쩌구 
                  그래서 그랬다니까?
                  <hr />

                </p>
              </Col>
              <CCol md={2} xs="auto" className="col-2 mb-3 align-self-center BulletinBoardPages-DelBtn-Layout">
                <CButton className="BulletinBoardPages-DelBtn" type="submit" color="light">삭제</CButton>
              </CCol>

              <div className="col-2 mb-3 align-self-center">
                </div>

            </CRow>
          </div>
        </CForm>
        <ul className="row me-0">
          <li className="child-comment">
            <form className="comment-delete-form">
              <input type="hidden" className="article-id" />
              <div className="row">
                <div className="col-md-10 col-lg-9">
                  <strong>뇨뇽 </strong>
                  <small><time>2022-01-01</time></small>
                  <p className="mb-1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Lorem ipsum dolor sit amet
                  </p>
                </div>
              <CCol md={2} xs="auto" className="BulletinBoardPages-DelBtn-Layout">
                <CButton className="BulletinBoardPages-DelBtn" type="submit" color="light">삭제</CButton>
              </CCol>
              </div>
            </form>
          </li>
        </ul>


        <ul className="row me-0">
          <li className="child-comment">
            <form className="comment-delete-form">
              <input type="hidden" className="article-id" />
              <div className="row">
                <div className="col-md-10 col-lg-9">
                <details>
          <summary>댓글 달기</summary>
          <CForm className="comment-form">
            <input type="hidden" className="article-id" />
            <input type="hidden" className="parent-comment-id" />
            <CFormTextarea
              className="form-control comment-textbox"
              placeholder="댓글 쓰기.."
              rows="2"
              required
            />
            <CButton
              className="form-control btn btn-primary mt-2"
              color="light"
              type="submit"
            >
              쓰기
            </CButton>
              </CForm>
              {/* Comment List */}
             
            </details>
                </div>
              <CCol md={2} xs="auto" className="BulletinBoardPages-DelBtn-Layout">
              </CCol>
              </div>
            </form>
          </li>
        </ul>











     
            </li>
              </ul>
          </CCol>
        </CRow>


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
      </CCard>
    </Container>
  );
}

export default BulletinBoardPages;
