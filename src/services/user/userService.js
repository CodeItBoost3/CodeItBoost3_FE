import axiosInstance from "@/services/axiosInstance";

/** 로그인한 사용자 정보 조회 */
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

/** 비밀번호 변경 API */
export const updatePassword = async (currentPassword, newPassword) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  return axiosInstance.patch("/users/me/password", {
    currentPassword,
    newPassword,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response => response.data);
};

/** 내 정보 변경 (비밀번호 제외) */
export const updateUserInfo = async (nickname) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  return axiosInstance.patch("/users/me", {
    nickname,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response => response.data);
};

/** 프로필 사진 업데이트 */
export const updateProfileImage = async (imageFile) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  const formData = new FormData();
  formData.append("profile", imageFile);

  return axiosInstance.patch("/users/me/profile-image", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  }).then(response => response.data);
};

/** 프로필 사진 삭제 */
export const deleteProfileImage = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  return axiosInstance.delete("/users/me/profile-image", {
    headers: { Authorization: `Bearer ${token}` },
  }).then(response => response.data);
};

/** 내가 작성한 글 목록 조회 */
export const getMyPosts = async (page = 1, limit = 5) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  return axiosInstance.get(`/users/me/posts?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(response => response.data);
};

/** 내가 작성한 댓글 목록 조회 */
export const getMyComments = async (page = 1, limit = 5) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  return axiosInstance.get(`/users/me/comments?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(response => response.data);
};

/** 내가 속한 그룹 목록 조회 */
export const getMyGroups = async (page = 1, pageSize = 5) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  return axiosInstance.get(`/users/me/groups?page=${page}&pageSize=${pageSize}`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(response => response.data);
};


const userService = {
  getUserInfo,
  updatePassword,
  updateUserInfo,
  updateProfileImage,
  deleteProfileImage,
  getMyPosts,
  getMyComments,
  getMyGroups
};

export default userService;