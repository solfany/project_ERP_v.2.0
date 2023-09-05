// npm install react-router-dom
//npm install @reduxjs/toolkit
//npm install js-cookie

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Redux useDispatch 함수 추가
//import { setAccessToken, setRefreshToken, setStaffInfo } from 'src/redux/authSlice'; // Redux action 함수 추가
import Cookies from 'js-cookie';

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

// JWT 토큰을 파싱하는 함수
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null; // 잘못된 토큰을 graceful하게 처리
  }
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // useDispatch를 사용하여 Redux dispatch 함수를 가져옴
  const [loginMessage, setLoginMessage] = useState('');
  const [empId, setEmpId] = useState('');
  const [empPwd, setEmpPwd] = useState('');

  const handleLogin = async () => {
    try {
      const loginData = {
        empId: empId,
        empPwd: empPwd,
      };

      const response = await axios.post('/api/login', loginData);

      if (response.status === 200) {
        const accessToken = response.headers['authorization'];
        const refreshToken = response.headers['refreshtoken'];
        //const staffInfo = response.data.staffInfo;  // Staff 정보를 추출
        // console.log('로그인 성공');
        // console.log('accessToken:' ,accessToken);
        // console.log('refreshToken:',refreshToken);

        // const accessToken = Cookies.get('accessToken');
        const decodedToken = parseJwt(accessToken);
        const staffInfo = decodedToken.staffInfo;
        // 토큰과 Staff 정보를 쿠키에 저장
        Cookies.set('accessToken', accessToken, { expires: 1, path: '/' });
        Cookies.set('refreshToken', refreshToken, { expires: 1, path: '/' });
        Cookies.set('staffInfo', JSON.stringify(staffInfo), {
          expires: 1,
          path: '/',
        });

        console.log('로그인 성공');
        console.log('accessToken:', accessToken);
        console.log('refreshToken:', refreshToken);
        console.log('staffInfo:', staffInfo);
        // Redux로 AccessToken 설정
        // dispatch(setAccessToken(accessToken));
        // dispatch(setRefreshToken(refreshToken));
        // dispatch(setStaffInfo(staffInfo)); // Staff 정보 저장

        // localStorage.setItem('accessToken', accessToken);
        // localStorage.setItem('refreshToken', refreshToken);

        //axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        // 로그인 성공 시 리다이렉션
        navigate('/Dashboard');
      } else {
        console.log('로그인 실패');
        setLoginMessage(
          '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.'
        );
      }
    } catch (error) {
      console.error('로그인 에러: ', error);
    }
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
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={handleLogin}
                        >
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
  );
};

export default Login;
