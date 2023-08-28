// npm install react-router-dom
//npm install jsonwebtoken

import React, { useState } from 'react';
import axios from 'axios';
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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';

const Login = () => {

  const navigate = useNavigate();
  const [loginMessage, setLoginMessage] = useState('');
  const [empId, setEmpId] = useState('');
  const [empPwd, setEmpPwd] = useState('');
 
  const handleLogin = async () => {

   
    try {
      const loginData = {
        empId: empId,
        empPwd: empPwd
      };

      const response = await axios.post('/api/login', loginData);

      if (response.status === 200) {
        //로그인 성공
        const token = response.data;
        console.log('로그인 성공');
        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem('token', token);

        // 토큰을 axios 요청의 헤더에 추가
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // 이제 인증된 요청을 보낼 수 있습니다.
        
        // 로그인 성공 시 리다이렉션
        navigate('/Dashboard'); 
      } else {
        //로그인 실패
        console.log('로그인 실패')
        setLoginMessage('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
      }
    } catch (error){
        console.error('로그인 에러: ', error)
    };
     
  };
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>로그인</h1>
                    {/* <p className="text-medium-emphasis">Sign In to your account</p> */}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="아이디"
                        autoComplete="username"
                        value={empId}
                        onChange={(e) => setEmpId(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="비밀번호"
                        autoComplete="password"
                        value={empPwd}
                        onChange={(e) => setEmpPwd(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleLogin}>
                          로그인
                        </CButton>
                      </CCol>
                    </CRow>
                   <p className="mt-3">{loginMessage}</p>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
