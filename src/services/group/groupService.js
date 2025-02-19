import axiosInstance from "@/services/axiosInstance";

/** 그룹 생성 */
export const createGroup = async (formData) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  // API 문서에 맞게 JSON 데이터를 FormData에 추가
  const payload = {
    name: formData.get("name"),
    introduction: formData.get("introduction"),
    isPublic: formData.get("isPublic") === "true", // 문자열을 boolean으로 변환
  };

  if (formData.get("password")) {
    payload.password = formData.get("password");
  }

  const finalFormData = new FormData();
  finalFormData.append("data", JSON.stringify(payload));

  // 이미지 파일 추가 (선택 사항)
  if (formData.get("groupImage")) {
    finalFormData.append("groupImage", formData.get("groupImage"));
  }

  return axiosInstance
    .post(`/api/groups`, finalFormData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // ❌ `finalFormData.getHeaders()` 제거
        // Axios가 자동으로 `Content-Type`을 설정하므로 필요 없음
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("그룹 생성 실패:", error);
      throw error;
    });
};



/** 그룹 목록 조회 */
export const getGroupList = async ({ type = "", sortBy = "", keyword = "", page = 1 }) => {
  try {
    const params = { sortBy, page };

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
  const token = localStorage.getItem("accessToken");

  return axiosInstance
    .get(`/api/groups/${groupId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => (response.data.status === "success" ? response.data.data : null))
    .catch((error) => {
      console.error("그룹 상세 조회 실패:", error);
      throw error;
    });
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

/** 그룹 이름 검색 */
export const searchGroups = async (keyword) => {
  if (!keyword.trim()) {
    throw new Error("검색어를 입력해 주세요.");
  }
  return axiosInstance
    .get(`/api/groups/search`, { params: { keyword } })
    .then((response) => response.data)
    .catch((error) => {
      console.error("그룹 검색 실패:", error);
      throw error;
    });
};


const groupService = {
  createGroup,
  getGroupList,
  getGroupDetail,
  updateGroup,
  deleteGroup,
  deleteGroupImage,
  searchGroups
};

export default groupService;
