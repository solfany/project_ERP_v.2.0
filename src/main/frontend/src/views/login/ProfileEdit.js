
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import Cookies from 'js-cookie';
import axios from 'axios';
import { Navigate } from 'react-router-dom'; // Navigate 추가

const ProfileEdit = () => {
  const [userInfo, setUserInfo] = useState({});
  const [newInfo, setNewInfo] = useState({});
  const [currentPassword, setCurrentPassword] = useState(''); // 현재 비밀번호 추가
  const [newPassword, setNewPassword] = useState(''); // 새로운 비밀번호 추가
  const [redirect, setRedirect] = useState(false); // 리디렉션 상태 추가
  const navigate = useNavigate();

  useEffect(() => {
    const staffInfoCookie = Cookies.get('staffInfo');

    if (staffInfoCookie) {
      const staffInfo = JSON.parse(staffInfoCookie);
      setUserInfo(staffInfo);
      // 기존 정보를 newInfo에 복사합니다.
      setNewInfo({...staffInfo});
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // 이름과 생년월일은 수정할 수 없도록 제어합니다.
    if (name === 'empName' || name === 'birthDate') {
      return;
    }
    // newInfo를 업데이트합니다.
    setNewInfo({ ...newInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 업데이트 로직 추가
      const data = {
        newInfo,
        currentPassword,
        newPassword,
      };
      const response = await axios.post(`/api/staff/${userInfo.empNum}`, data);

      if (response.status === 200) {
        // 성공적인 업데이트 메시지 또는 다른 처리를 수행
        alert('직원 정보가 업데이트되었습니다.');

        // 수정된 정보 추출하여 StaffDto 업데이트
        const updatedInfo = response.data; // 예를 들어, 백엔드에서 업데이트된 정보를 응답 데이터로 보냈다고 가정
        setNewInfo(updatedInfo);
        // 리디렉션을 트리거
        setRedirect(true);
      } else {
        // 실패 메시지 또는 다른 처리를 수행
        alert('직원 정보 업데이트 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('직원 정보 업데이트 오류:', error);
      alert('직원 정보 업데이트 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h2>프로필 수정</h2>
                    <div className="mb-3">
                      <CInputGroup>
                        <CInputGroupText>직원 이름</CInputGroupText>
                        <CFormInput
                          type="text"
                          name="empName"
                          value={newInfo.empName || ''}
                          onChange={handleInputChange}
                          disabled // 수정 비활성화
                        />
                      </CInputGroup>
                    </div>
                    <div className="mb-3">
                      <CInputGroup>
                        <CInputGroupText>생년월일</CInputGroupText>
                        <CFormInput
                          type="text"
                          name="birthDate"
                          value={newInfo.birthDate || ''}
                          onChange={handleInputChange}
                          disabled // 수정 비활성화
                        />
                      </CInputGroup>
                    </div>
                    <div className="mb-3">
                      <CInputGroup>
                        <CInputGroupText>전화번호</CInputGroupText>
                        <CFormInput
                          type="text"
                          name="phoneNumber"
                          value={newInfo.phoneNumber || ''}
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                    </div>
                    <div className="mb-3">
                      <CInputGroup>
                        <CInputGroupText>주소</CInputGroupText>
                        <CFormInput
                          type="text"
                          name="address"
                          value={newInfo.address || ''}
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                    </div>
                    <div className="mb-3">
                      <CInputGroup>
                        <CInputGroupText>이메일</CInputGroupText>
                        <CFormInput
                          type="email"
                          name="email"
                          value={newInfo.email || ''}
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                    </div>
                    <div className="mb-3">
                      <CInputGroup>
                        <CInputGroupText>은행 이름</CInputGroupText>
                        <CFormInput
                          type="text"
                          name="bankName"
                          value={newInfo.bankName || ''}
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                    </div>
                    <div className="mb-3">
                      <CInputGroup>
                        <CInputGroupText>계좌 번호</CInputGroupText>
                        <CFormInput
                          type="text"
                          name="accountNumber"
                          value={newInfo.accountNumber || ''}
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                    </div>
                    <div className="mb-3">
                      <CInputGroup>
                        <CInputGroupText>현재 비밀번호</CInputGroupText>
                        <CFormInput
                          type="password"
                          name="currentPassword"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </CInputGroup>
                    </div>
                    <div className="mb-3">
                      <CInputGroup>
                        <CInputGroupText>새로운 비밀번호</CInputGroupText>
                        <CFormInput
                          type="password"
                          name="newPassword"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </CInputGroup>
                    </div>
                    <CButton color="primary" type="submit">
                      저장
                    </CButton>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      {redirect && <Navigate to="/dashboard" />} {/* 리디렉션 */}
    </div>
  );
};

export default ProfileEdit;
