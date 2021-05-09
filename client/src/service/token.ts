import jwt from 'jsonwebtoken';

const Token = {
  saveAuthToken(token) {
    window.localStorage.setItem('authToken', token);
  },
  getAuthToken() {
    return window.localStorage.getItem('authToken');
  },
  isExpired() {
    const token = Token.getAuthToken() || '';
    const { exp }: any = jwt.decode(token);
    return Date.now() >= exp * 1000;
  },
  clearAuthToken() {
    window.localStorage.removeItem('authToken');
  },
  hasAuthToken() {
    return !!Token.getAuthToken();
  },
};

export default Token;
