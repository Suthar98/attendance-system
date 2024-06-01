import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'jwtToken';

const login = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const getUser = () => {
  try {
    const token = getToken();
    return jwtDecode(token);
  } catch (ex) {
    return null;
  }
};

const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    if (exp < Date.now() / 1000) {
      logout();
      return false;
    }
    return true;
  } catch (ex) {
    return false;
  }
};

export default {
  login,
  logout,
  getToken,
  getUser,
  isAuthenticated,
};
