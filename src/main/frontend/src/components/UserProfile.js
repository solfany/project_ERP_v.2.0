// npm install jwt-decode

import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // accessToken을 가져와서 Staff 정보 파싱
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken);
      const staffInfo = decodedToken.staff; // 'sub' 필드를 사용하여 empId 추출
      const empName = staffInfo.empName;
      setUserInfo({ empName });
    }
  }, []);

  const handleLogout = () => {
    //로그 아웃 버튼 클릭 시 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('accessToken');

    navigate('/Login');
  }

  return (
    <div>
      {userInfo ? (
        <div>
          <p>{userInfo.empName} 님 환영합니다.</p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <p>사용자 정보를 불러올 수 없습니다.</p>
      )}
    </div>
  );
};

export default UserProfile;