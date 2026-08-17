import api from "./api";

const TOKEN_KEY = "careercompass_access_token";

const register = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};

const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

const loginWithGoogle = async (googleToken) => {
  const response = await api.post("/auth/google", { token: googleToken });
  return response.data;
};

const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export default {
  register,
  login,
  loginWithGoogle,
  getCurrentUser,
  logout,
};