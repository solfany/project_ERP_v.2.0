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
    //e.preventDefault();
    //const submitButton = e.currentTarget;
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

      //처리 완료 후 버튼 다시 활성화
      //submitButton.removeAttribute('disabled');

      // fetchStaffs();
      // setShowModal(false);
    } catch (error) {
      console.error('Error adding staffs:', error);
      // submitButton.removeAttribute('disabled'); //처리 실패시에도 버튼 활성화
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/staff/${id}`);
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
          <CCol md={12} style={{margin:'20px'}}>
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
                      <CTableRow key={staff.id}>
                        <CTableDataCell>{staff.empNum}</CTableDataCell>
                        <CTableDataCell>{staff.empId}</CTableDataCell>
                        <CTableDataCell>{staff.dept}</CTableDataCell>
                        <CTableDataCell>{staff.position}</CTableDataCell>
                        <CTableDataCell>{staff.empName}</CTableDataCell>
                        <CTableDataCell>{staff.birthDate}</CTableDataCell>
                        <CTableDataCell>{staff.phoneNumber}</CTableDataCell>
                        <CTableDataCell>{staff.address}</CTableDataCell>
                        <CTableDataCell>{staff.email}</CTableDataCell>
                        <CTableDataCell>{staff.bankName}</CTableDataCell>
                        <CTableDataCell>{staff.accountNumber}</CTableDataCell>
                        <CTableDataCell>
                          <Button
                            color="danger"
                            size="sm"
                            onClick={() => handleDelete(staff.id)}
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
              <Form.Label>사원번호</Form.Label>
              <Form.Control
                type="text"
                placeholder="사원번호"
                value={empNum}
                onChange={(e) => setEmpNum(e.target.value)}
              />
            </Form.Group>
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
                type="text"
                placeholder="부서"
                value={dept}
                onChange={(e) => setDept(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>직급</Form.Label>
              <Form.Control
                type="text"
                placeholder="직급"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
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
                type="text"
                placeholder="생년월일"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>연락처</Form.Label>
              <Form.Control
                type="text"
                placeholder="연락처"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
              <Form.Label>이메일주소</Form.Label>
              <Form.Control
                type="text"
                placeholder="이메일주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>은행명</Form.Label>
              <Form.Control
                type="text"
                placeholder="은행명"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>계좌번호</Form.Label>
              <Form.Control
                type="text"
                placeholder="계좌번호"
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