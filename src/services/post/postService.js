import axiosInstance from "@/services/axiosInstance";

/** 게시글 작성 */
export const createPost = async (groupId, postData) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  const formData = new FormData();
  formData.append("title", postData.title);
  formData.append("content", postData.content);
  formData.append("location", postData.location);
  formData.append("moment", postData.moment);
  formData.append("isPublic", postData.isPublic);

  postData.tag.forEach((tag) => formData.append("tag", tag));

  if (postData.imageFile) {
    formData.append("imageFile", postData.imageFile);
  }
  return axiosInstance
    .post(`/api/groups/1/posts`, formData, {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      },
    })
    .then((response) => response.data);
};


/** 게시글 목록 조회 */
export const getPostList = async ({ groupId, page = 1, pageSize = 10, sortBy = "latest", keyword = "", isPublic = null }) => {
  return axiosInstance
    .get(`/api/groups/${groupId}/posts`, {
      params: {
        page,
        pageSize,
        sortBy,
        keyword,
        isPublic,
      },
    })
    .then((response) => response.data);
};

/** 게시글 상세 조회 */
export const getPostDetail = async (postId) => {
  return axiosInstance
    .get(`/api/posts/${postId}`)
    .then((response) => response.data);
};

/** 게시글 수정 */
export const updatePost = async (postId, updatedData) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  return axiosInstance
    .put(`/api/posts/${postId}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data);
};

/** 게시글 삭제 */
export const deletePost = async (postId) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  return axiosInstance
    .delete(`/api/posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data);
};

const postService = {
  createPost,
  getPostList,
  getPostDetail,
  updatePost,
  deletePost,
};

export default postService;
