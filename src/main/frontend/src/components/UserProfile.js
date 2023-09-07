import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from "@coreui/react";
import Cookies from 'js-cookie'; // js-cookie 라이브러리 추가



const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 쿠키에서 staff 정보를 가져오기
    const staffInfoCookie = Cookies.get('staffInfo');

    if (staffInfoCookie) {
      const staffInfo = JSON.parse(staffInfoCookie);
      const empName = staffInfo.empName;
      setUserInfo({ empName });
    }
  }, []);

  const handleLogout = () => {
    // 로그아웃 버튼 클릭 시 로컬 스토리지와 쿠키에서 토큰 및 staff 정보 제거
    localStorage.removeItem('accessToken');
    Cookies.remove('staffInfo');
    navigate('/Login');
  };

  return (
    <CHeader position="sticky-top" style={{ border: 'none' }}>
      <CContainer fluid>
        <CHeaderNav className="d-none d-md-flex">
          {userInfo ? (
            <CDropdown inNav>
              <CDropdownToggle caret>
                {userInfo.empName} 님
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>
                  <Link to="/login/ProfileEdit">정보 수정</Link> {/* 정보 수정 페이지로 이동 */}
                </CDropdownItem>
                <CDropdownItem onClick={handleLogout}>로그아웃</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          ) : null}
        </CHeaderNav>
      </CContainer>
      <style>
        {`
          .c-header-nav .c-header-nav-divider {
            display: none;
          }
        `}
      </style>
    </CHeader>
  );
};

export default UserProfile;