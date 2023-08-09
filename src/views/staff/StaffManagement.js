//npm install @coreui/react 설치
//npm install react-bootstrap bootstrap

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CForm, CFormInput, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const staffManagement = () => {
  const [empNum, setEmpNum] = useState(''); // 사원번호
  const [empId, setEmpId] = useState(''); //아이디
  const [dept, setDept] = useState(''); // 부서 
  const [position, setPosition] = useState(''); // 직급
  const [empName, setEmpName] = useState('');//이름
  const [birthDate, setBirthDate] = useState(''); // 생년월일
  const [phoneNumber, setPhoneNumber] = useState(''); // 연락처
  const [address, setAddress] = useState(''); // 주소
  const [bankName, setBankName] = useState(''); // 은행명
  const [email, setEmail] = useState(''); // 은행명
  const [accountNumber, setAccountNumber] = useState(''); // 계좌번호
  const [staffs, setStaffs] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchStaffs = async () => {
    try {
      const response = await axios.get('/api/staffs');
      setStaffs(response.data);
    } catch (error) {
      console.error('Error fetching staffs:', error);
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/staffs', { 
        empNum,
        position,
        empId,
        dept,
        empName,
        birthDate,
        phoneNumber,
        address,
        email,
        bankName,
        accountNumber 
      });
      setEmpNum('');
      setEmpId('');
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
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {staffs.map((staffs) => (
                      <CTableRow key={staffs.id}>
                        <CTableDataCell>{staffs.empNum}</CTableDataCell>
                        <CTableDataCell>{staffs.empId}</CTableDataCell>
                        <CTableDataCell>{staffs.dept}</CTableDataCell>
                        <CTableDataCell>{staffs.position}</CTableDataCell>
                        <CTableDataCell>{staffs.empName}</CTableDataCell>
                        <CTableDataCell>{staffs.birthDate}</CTableDataCell>
                        <CTableDataCell>{staffs.phoneNumber}</CTableDataCell>
                        <CTableDataCell>{staffs.address}</CTableDataCell>
                        <CTableDataCell>{staffs.email}</CTableDataCell>
                        <CTableDataCell>{staffs.bankName}</CTableDataCell>
                        <CTableDataCell>{staffs.accountNumber}</CTableDataCell>
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
          {/* <Form.Group className="mb-3">
              <Form.Label>사원번호</Form.Label>
              <Form.Control
                type="text"
                placeholder="사원번호"
                value={empNum}
                onChange={(e) => setEmpNum(e.target.value)}
              />
            </Form.Group> */}
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

export default staffManagement;