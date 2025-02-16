import axiosInstance from "@/services/axiosInstance";

export const login = async (clientId, password) => {
  const response = await axiosInstance.post("/auth/login", { clientId, password });
  return response.data;
};

export const checkIdAvailability = async (clientId) => {
  const response = await axiosInstance.get(`/users/validation?client-id=${clientId}`);
  return response.data;
};

export const signup = async ({ clientId, password, nickname }) => {
  const response = await axiosInstance.post("/users", { clientId, password, nickname });
  return response.data;
};

const authService = {
  login,
  checkIdAvailability,
  signup,
};

export default authService;
