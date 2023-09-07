//npm install @coreui/react 설치
//npm install react-bootstrap bootstrap

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CForm, CFormInput, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const StaffManagement = () => {
  const [empNum, setEmpNum] = useState(''); // 사원번호
  const [empId, setEmpId] = useState(''); //아이디
  const [empPwd, setEmpPwd] = useState(''); //패스워드
  const [dept, setDept] = useState(''); // 부서 
  const [position, setPosition] = useState(''); // 직급
  const [empName, setEmpName] = useState('');//이름
  const [birthDate, setBirthDate] = useState(''); // 생년월일
  const [phoneNumber, setPhoneNumber] = useState(''); // 연락처
  const [address, setAddress] = useState(''); // 주소
  const [bankName, setBankName] = useState(''); // 은행명
  const [email, setEmail] = useState(''); // 이메일주소
  const [accountNumber, setAccountNumber] = useState(''); // 계좌번호
  const [staffs, setStaffs] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchStaffs = async () => {
    try {
      const response = await axios.get('/api/staff');
      setStaffs(response.data);
    } catch (error) {
      console.error('Error fetching staffs:', error);
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  const handleSubmit = async () => {

    try {
      const staffDto = {
        empNum,
        empId,
        empPwd,
        dept,
        position,
        empName,
        birthDate,
        phoneNumber,
        address,
        email,
        bankName,
        accountNumber
      };

      const newEmail = `${email.split('@')[0]}@${email.split('@')[1]}`;
      setEmail(newEmail);
      // 요청 보내기 전에 버튼 비활성화
      //submitButton.setAttribute('disabled', 'true');
      await axios.post('/api/register', staffDto);
      setEmpNum('');
      setEmpId('');
      setEmpPwd('');
      setDept('');
      setPosition('');
      setEmpName('');
      setBirthDate('');
      setPhoneNumber('');
      setAddress('');
      setEmail('');
      setBankName('');
      setAccountNumber('');
      fetchStaffs();
      setShowModal(false); // Hide the modal after successful submission


    } catch (error) {
      console.error('Error adding staffs:', error);
    }
  };

  const handleDelete = async (empNum) => {
    try {
      await axios.delete(`/api/staff/${empNum}`);
      fetchStaffs(); // 직원 리스트 갱신
    } catch (error) {
      console.error("삭제 불가", error);
    }
  };

  return (
    <div>
      <CContainer>
        <CRow>
          <CCol md={12} className="d-flex justify-content-end">
            <CButton color="primary" style={{ fontSize: '12px' }} onClick={() => setShowModal(true)}>
              직원 추가
            </CButton>
          </CCol>
        </CRow>
        <CRow>
          <CCol md={12} style={{ margin: '20px' }}>
            <CCard>
              <CCardHeader>직원 리스트</CCardHeader>
              <CCardBody>
                <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>사원번호</CTableHeaderCell>
                        <CTableHeaderCell>아이디</CTableHeaderCell>
                        <CTableHeaderCell>부서</CTableHeaderCell>
                        <CTableHeaderCell>직급</CTableHeaderCell>
                        <CTableHeaderCell>이름</CTableHeaderCell>
                        <CTableHeaderCell>생년월일</CTableHeaderCell>
                        <CTableHeaderCell>연락처</CTableHeaderCell>
                        <CTableHeaderCell>주소</CTableHeaderCell>
                        <CTableHeaderCell>이메일주소</CTableHeaderCell>
                        <CTableHeaderCell>은행명</CTableHeaderCell>
                        <CTableHeaderCell>계좌번호</CTableHeaderCell>
                        <CTableHeaderCell>삭제</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {staffs.map((staff) => (
                        <CTableRow key={staff.empNum}>
                          <CTableDataCell>{staff.empNum}</CTableDataCell>
                          <CTableDataCell>{staff.empId}</CTableDataCell>
                          <CTableDataCell>{staff.dept}</CTableDataCell>
                          <CTableDataCell>{staff.position}</CTableDataCell>
                          <CTableDataCell>{staff.empName}</CTableDataCell>
                          <CTableDataCell>{staff.birthDate}</CTableDataCell>
                          {/* <CTableDataCell>{staff.phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}</CTableDataCell> */}
                          <CTableDataCell>{staff.phoneNumber}</CTableDataCell>
                          <CTableDataCell>{staff.address}</CTableDataCell>
                          {/* <CTableDataCell>{staff.email.split('@')[0]}</CTableDataCell> */}
                          <CTableDataCell>{staff.email}</CTableDataCell>
                          {/* <CTableDataCell>{staff.email.includes('@') ? staff.email.split('@')[1] : ''}</CTableDataCell> */}
                          <CTableDataCell>{staff.bankName}</CTableDataCell>
                          <CTableDataCell>{staff.accountNumber}</CTableDataCell>
                          <CTableDataCell>
                            <Button
                              color="danger"
                              size="sm"
                              onClick={() => handleDelete(staff.empNum)}
                            >
                              삭제
                            </Button>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>아이디</Form.Label>
              <Form.Control
                type="text"
                placeholder="아이디"
                value={empId}
                onChange={(e) => setEmpId(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>패스워드</Form.Label>
              <Form.Control
                type="text"
                placeholder="패스워드"
                value={empPwd}
                onChange={(e) => setEmpPwd(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>부서</Form.Label>
              <Form.Control

                as="select"
                type="text"
                placeholder="부서"
                value={dept}
                onChange={(e) => setDept(e.target.value)}
              >
                <option value="부서선택">부서선택</option>
                <option value="인사팀">인사팀</option>
                <option value="관리팀">관리팀</option>
                <option value="생산팀">생산팀</option>
                <option value="마케팅">마케팅</option>
                <option value="기획팀">기획팀</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>직급</Form.Label>
              <Form.Control
                as="select"
                type="text"
                placeholder="직급"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              >
                <option value="직급선택">직급선택</option>
                <option value="사장">사장</option>
                <option value="부장">부장</option>
                <option value="차장">차장</option>
                <option value="과장">과장</option>
                <option value="대리">대리</option>
                <option value="사원">사원</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="text"
                placeholder="이름"
                value={empName}
                onChange={(e) => setEmpName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>생년월일</Form.Label>
              <Form.Control
                type="date"
                placeholder="생년월일"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>연락처</Form.Label>
              <Form.Control
                type="text"
                placeholder="번호를 입력해주세요"
                value={phoneNumber}
                onChange={(e) => {
                  const formattedPhoneNumber = e.target.value.replace(/[^0-9]/g, '');
                  setPhoneNumber(formattedPhoneNumber);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>주소</Form.Label>
              <Form.Control
                type="text"
                placeholder="주소"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>이메일</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="이메일"
                  value={email.split('@')[0]} // @ 이전의 아이디 부분
                  onChange={(e) => {
                    const newEmail = e.target.value + (email.includes('@') ? email.split('@')[1] : '');
                    setEmail(newEmail);
                  }}
                  style={{ flex: 1, marginRight: '5px' }}
                />
                <Form.Control
                  as="select"
                  value={email.includes('@') ? email.split('@')[1] : ''}
                  onChange={(e) => {
                    const newEmail = email.split('@')[0] + '@' + e.target.value;
                    setEmail(newEmail);
                  }}
                  style={{ flex: 2 }}
                >
                  <option value="naver.com">naver.com</option>
                  <option value="google.com">google.com</option>
                  {/* 다른 이메일 도메인도 추가할 수 있습니다. */}
                </Form.Control>
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>은행명</Form.Label>
              <Form.Control
                as="select"
                type="text"
                placeholder="은행명"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              >
                <option value="은행선택">은행선택</option>
                <option value="국민은행">국민은행</option>
                <option value="기업은행">기업은행</option>
                <option value="우리은행">우리은행</option>
                <option value="농협">농협</option>
                <option value="카카오뱅크">카카오뱅크</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>계좌번호</Form.Label>
              <Form.Control
                type="text"
                placeholder="-없이 입력해주세요"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            직원등록
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            등록취소
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StaffManagement;