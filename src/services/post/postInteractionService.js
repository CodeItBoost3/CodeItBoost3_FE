import axiosInstance from "@/services/axiosInstance";

/** 게시글 공감 (좋아요) 추가/취소 */
export const likePost = async (postId) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  return axiosInstance
    .post(`/api/posts/${postId}/like`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("게시글 공감 오류:", error);
      throw new Error(error.response?.data?.message || "게시글 공감 중 오류 발생");
    });
};

/** 게시글 공개 여부 조회 */
export const checkPostPublicStatus = async (postId) => {
  return axiosInstance
    .get(`/api/posts/${postId}/is-public`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("게시글 공개 여부 조회 오류:", error);
      throw new Error(error.response?.data?.message || "게시글 공개 여부 조회 중 오류 발생");
    });
};

/** 스크랩 추가/삭제 */
export const toggleScrap = async (postId, isPublic) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  return axiosInstance
    .post(`/api/posts/${postId}/scraps`, { isPublic }, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("스크랩 추가/삭제 오류:", error);
      throw new Error(error.response?.data?.message || "스크랩 추가/삭제 중 오류 발생");
    });
};

const postInteractionService = {
  likePost,
  checkPostPublicStatus,
  toggleScrap,
};

export default postInteractionService;
