import axiosInstance from "@/services/axiosInstance";

/** 그룹 생성 */
export const createGroup = async (formData) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  return axiosInstance
    .post(`/api/groups`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

/** 그룹 목록 조회 */
export const getGroupList = async ({ type = "", sortBy = "mostLiked", keyword = "" }) => {
  try {
    const params = { sortBy };

    if (type) {
      params.type = type;
    }
    if (keyword.trim()) {
      params.keyword = keyword;
    }

    const response = await axiosInstance.get(`/api/groups`, { params });

    return response.data;
  } catch (error) {
    console.error("그룹 목록 조회 실패:", error);
    throw error;
  }
};

  

/** 그룹 상세 조회 */
export const getGroupDetail = async (groupId) => {
  return axiosInstance
    .get(`/api/groups/${groupId}`)
    .then((response) => response.data);
};

/** 그룹 수정 */
export const updateGroup = async (groupId, updatedData) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  return axiosInstance
    .put(`/api/groups/${groupId}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data);
};

/** 그룹 삭제 */
export const deleteGroup = async (groupId) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  return axiosInstance
    .delete(`/api/groups/${groupId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data);
};

/** 그룹 이미지 삭제 */
export const deleteGroupImage = async (groupId) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  return axiosInstance
    .delete(`/api/groups/${groupId}/image`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data);
};

const groupService = {
  createGroup,
  getGroupList,
  getGroupDetail,
  updateGroup,
  deleteGroup,
  deleteGroupImage,
};

export default groupService;
