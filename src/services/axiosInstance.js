import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API 요청 중 오류 발생:", error.response || error);

    if (error.response) {
      const { status } = error.response;

      if (status === 404) {
        window.location.href = "/notfound"; 
      }

      if (status === 401) {
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = "/login"; 
      }
    } else {
      alert("네트워크 오류 또는 서버 문제로 요청을 처리할 수 없습니다.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
