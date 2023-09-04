import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: import.meta.env.PROD ? '' : 'http://shopping-mall.ap-northeast-2.elasticbeanstalk.com/',
  baseURL: 'http://localhost:3000/',
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = ocalSltorage.getItem('refreshToken');

    // 액세스 토큰이 있는 경우 헤더에 추가
    if (accessToken) {
      config.headers.Authorization = 'Bearer ' + accessToken;
    }

    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    // 액세스 토큰이 만료되었고, 리프레시 토큰이 있는 경우 리프레시 시도
    if (error.response.data.error === 'TOKEN_02' && localStorage.getItem('refreshToken')) {
      // 리프레시 토큰을 사용하여 새로운 액세스 토큰 발급 요청
      const newAccessToken = await requestNewAccessToken();
      
      if (newAccessToken) {
        // 새로 발급된 액세스 토큰으로 원래 요청 재시도
        originalRequest.headers.Authorization = 'Bearer ' + newAccessToken;
        return axiosInstance(originalRequest);
      }
    }

    // 리프레시 토큰이 없거나 리프레시도 실패한 경우 로그인 화면으로 리다이렉트 또는 다른 처리를 수행하십시오.
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.reload(); // 예시로 페이지 리로드

    return Promise.reject(error);
  }
);

async function requestNewAccessToken() {
  try {
    // 리프레시 토큰을 사용하여 새로운 액세스 토큰 요청
    const response = await axiosInstance.post('/refresh-token', {
      refreshToken: localStorage.getItem('refreshToken')
    });

    if (response.data.accessToken) {
      // 새로운 액세스 토큰 반환
      localStorage.setItem('accessToken', response.data.accessToken);
      return response.data.accessToken;
    }
  } catch (error) {
    // 리프레시 토큰을 사용하여 새로운 액세스 토큰 요청 실패
    console.error('Failed to request a new access token:', error);
  }

  return null;
}

export default axiosInstance;