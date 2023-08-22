import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: import.meta.env.PROD ? '' : 'http://shopping-mall.ap-northeast-2.elasticbeanstalk.com/',
  baseURL: 'http://localhost:3000/',
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers.Authorization =
      'Bearer ' + localStorage.getItem('accessToken');
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
  function (error) {
    if (error.response.data.error === 'TOKEN_02') {
      localStorage.removeItem('accessToken');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
