import axiosInstance from "@/services/axiosInstance";

/** 특정 게시글의 스크랩 여부 확인 */
export const checkScrapStatus = async (postId) => {
  try {
    const response = await axiosInstance.get(`/api/scraps/${postId}`);
    return response.data; // { "isScrapped": true/false }
  } catch (error) {
    console.error("스크랩 여부 확인 오류:", error);
    throw new Error(error.response?.data?.message || "스크랩 여부 확인 중 오류 발생");
  }
};

/** 특정 스크랩한 게시글 상세 조회 */
export const getScrapDetail = async (postId) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  try {
    const response = await axiosInstance.get(`/api/scraps/post/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.error("스크랩 상세 조회 오류:", error);
    throw new Error(error.response?.data?.message || "스크랩 상세 조회 중 오류 발생");
  }
};

/** 스크랩 목록 조회 (페이지네이션, 검색, 정렬) */
export const getScrapList = async ({ page = 1, pageSize = 10, sortBy = "latest", keyword = "", isPublic = null, postId = null }) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  try {
    const response = await axiosInstance.get("/api/scraps", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        page,
        pageSize,
        sortBy,
        keyword,
        isPublic,
        postId,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("스크랩 목록 조회 오류:", error);
    throw new Error(error.response?.data?.message || "스크랩 목록 조회 중 오류 발생");
  }
};

const scrapService = {
  checkScrapStatus,
  getScrapDetail,
  getScrapList,
};

export default scrapService;
