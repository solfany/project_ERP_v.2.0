import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const getUserInfo = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    // 유저 정보 가져오기: accessToken을 가져와서 Staff 정보 파싱
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken);
      const staffInfo = decodedToken.staff; // 'sub' 필드를 사용하여 empId 추출
      setUserInfo(staffInfo);
      console.log('유저 정보: ', userInfo);
    }
  }, []);

  return userInfo;
};

export default getUserInfo;
