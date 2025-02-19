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

  formData.append("tag", JSON.stringify(postData.tag));

  if (postData.imageFile) {
    formData.append("image", postData.imageFile);
  }

  try {
    const response = await axiosInstance.post(`/api/groups/${groupId}/posts`, formData, {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      },
    });

    return response.data;
  } catch (error) {
    console.error("게시글 작성 실패:", error);

    if (error.response) {
      const errorMsg = error.response.data?.message || "게시글 작성 중 오류가 발생했습니다.";
      throw new Error(errorMsg);
    } else {
      throw new Error("서버와의 연결이 원활하지 않습니다.");
    }
  }
};

/** 게시글 목록 조회 */
export const getPostList = async ({ groupId, page = 1, pageSize = 10, sortBy = "latest", keyword = "" }) => 
  axiosInstance.get(`/api/groups/${groupId}/posts`, {
    params: { page, pageSize, sortBy, keyword },
  }).then(response => response.data);


/** 게시글 상세 조회 */
export const getPostDetail = async (postId) => {
  return axiosInstance
    .get(`/api/posts/${postId}`)
    .then((response) => response.data);
};

/** 게시글 수정 */
export const updatePost = async (postId, formData) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("인증 토큰이 없습니다. 다시 로그인해 주세요.");
  }

  return axiosInstance.put(`/api/posts/${postId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  }).then(response => response.data);
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
