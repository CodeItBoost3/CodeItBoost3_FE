import axiosInstance from "@/services/axiosInstance";
import userService from "@/services/user/userService";

/** 댓글 작성 */
export const createComment = async (postId, content) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  try {
 
    const userInfo = await userService.getUserInfo();
    const userId = userInfo?.data.id;

    if (!userId) {
      throw new Error("사용자 정보를 가져올 수 없습니다. 다시 로그인해 주세요.");
    }

    const requestBody = {
      content,
      userId: Number(userId),
    };

    return axiosInstance
      .post(`/api/posts/${postId}/comments`, requestBody, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.status === "success") {
          return response.data.data;
        } else {
          throw new Error(response.data.message || "댓글 작성 중 오류 발생");
        }
      });
  } catch (error) {
    throw new Error(error.message || "사용자 정보를 가져오는 중 오류가 발생했습니다.");
  }
};

/** 특정 게시글의 댓글 조회 */
export const getCommentsByPost = async (postId) => {
  return axiosInstance.get(`/api/posts/${postId}/comments`)
    .then(response => response.data);
};

/** 댓글 수정 */
export const updateComment = async (commentId, content) => {
  if (!commentId) {
    throw new Error("commentId가 제공되지 않았습니다.");
  }

  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  return axiosInstance
    .put(
      `/api/comments/${commentId}`,
      { content }, 
    )
    .then((response) => {
      if (response.data.status === "success") {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "댓글 수정 중 오류 발생");
      }
    })
    .catch((error) => {
      console.error("댓글 수정 요청 실패:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "댓글 수정 중 오류 발생");
    });
};


/** 댓글 삭제 */
export const deleteComment = async (commentId) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  return axiosInstance.delete(`/api/comments/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(response => response.data);
};

/** 댓글 공감(좋아요) */
export const likeComment = async (commentId) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  return axiosInstance.post(`/api/comments/${commentId}/like`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(response => response.data);
};

const commentService = {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
  likeComment,
};

export default commentService;
