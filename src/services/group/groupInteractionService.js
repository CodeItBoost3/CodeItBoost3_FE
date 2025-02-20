import axiosInstance from "@/services/axiosInstance";

/** 그룹 공개 여부 확인 */
export const checkGroupPublicStatus = async (groupId) => {
  return axiosInstance
    .get(`/api/groups/${groupId}/is-public`)
    .then((response) => response.data);
};

/** 그룹 이름 검색 */
export const searchGroupByName = async (name) => {
  return axiosInstance
    .get(`/api/groups/search`, {
      params: { name },
    })
    .then((response) => response.data);
};

/** 그룹 비밀번호 검증 */
export const verifyGroupPassword = async (groupId, password) => {
  return axiosInstance
    .post(`/api/groups/${groupId}/verify-password`, { password })
    .then((response) => response.data);
};

/** 그룹 공감 (좋아요) 추가 */
export const likeGroup = async (groupId) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  return axiosInstance
    .post(`/api/groups/${groupId}/like`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.data?.message || "그룹 공감 중 오류 발생");
    });
};


/** 그룹 가입 */
export const joinGroup = async (groupId) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  try {
    const response = await axiosInstance.post(`/api/groups/${groupId}/join`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === 400) throw new Error("이미 가입한 그룹입니다.");
      if (status === 401) throw new Error("로그인이 필요합니다.");
      if (status === 404) throw new Error("존재하지 않는 그룹입니다.");
      if (status === 500) throw new Error("서버 오류가 발생했습니다.");
    }
    throw new Error("그룹 가입 중 오류 발생");
  }
};

/** 그룹 탈퇴 */
export const leaveGroup = async (groupId) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  return axiosInstance
    .delete(`/api/groups/${groupId}/leave`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.data?.message || "그룹 탈퇴 중 오류 발생");
    });
};


const groupInteractionService = {
  checkGroupPublicStatus,
  searchGroupByName,
  verifyGroupPassword,
  joinGroup,
  leaveGroup,
  likeGroup
};

export default groupInteractionService;
