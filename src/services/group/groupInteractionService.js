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

const groupInteractionService = {
  checkGroupPublicStatus,
  searchGroupByName,
  verifyGroupPassword,
};

export default groupInteractionService;
