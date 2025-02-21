import axiosInstance from "@/services/axiosInstance";

/** 그룹 생성 */
export const createGroup = async (groupData) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  try {
    // ✅ FormData 생성
    const finalFormData = new FormData();

    // ✅ JSON 문자열을 그대로 추가 (data 키 안에 포함, Binary X)
    const payload = {
      name: groupData.name,
      introduction: groupData.introduction,
      isPublic: groupData.isPublic.toString(),
    };

    if (groupData.password) {
      payload.password = groupData.password;
    }

    finalFormData.append("data", JSON.stringify(payload)); // ✅ JSON을 문자열 그대로 추가 (바이너리 X)

    // ✅ 이미지 파일을 별도 필드로 추가 (있을 경우에만)
    if (groupData.groupImage && groupData.groupImage instanceof File) {
      finalFormData.append("groupImage", groupData.groupImage, groupData.groupImage.name);
    } else {
      console.warn("⚠️ groupImage가 올바른 File 객체가 아닙니다.", groupData.groupImage);
    }

    // ✅ FormData 확인용 콘솔 로그
    console.log("📌 최종 FormData 내용:");
    for (let [key, value] of finalFormData.entries()) {
      if (value instanceof File) {
        console.log(`${key}:`, `파일 (${value.type}, 크기: ${value.size} bytes)`);
      } else {
        console.log(`${key}:`, value);
      }
    }

    // ✅ 그룹 생성 요청 (JSON + multipart/form-data)
    const response = await axiosInstance.post(`/api/groups`, finalFormData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // ✅ multipart/form-data 명시
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ 그룹 생성 실패:", error);
    throw new Error(error.response?.data?.message || "그룹 생성 중 오류가 발생했습니다.");
  }
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

  const formData = new FormData();
  formData.append("data", JSON.stringify(updatedData));

  if (updatedData.groupImage) {
    formData.append("groupImage", updatedData.groupImage);
  }

  for (let pair of formData.entries()) {
    console.log("   ", pair[0], pair[1]);
  }

  return axiosInstance
    .patch(`/api/groups/${groupId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
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

  return axiosInstance.get(`/api/groups/search`, { params: { keyword } })
    .then((response) => response.data);
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
