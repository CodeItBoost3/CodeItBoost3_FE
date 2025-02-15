import axiosInstance from "@/services/axiosInstance";

{/* 로그인한 사용자 정보 조회 */}
export const getUserInfo = async () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  return axiosInstance.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response => response.data);
};

const userService = {
  getUserInfo,
};

export default userService;
