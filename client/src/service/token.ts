const Token = {
  saveAuthToken(token) {
    window.localStorage.setItem('authToken', token);
  },
  getAuthToken() {
    return window.localStorage.getItem('authToken');
  },
  clearAuthToken() {
    window.localStorage.removeItem('authToken');
  },
  hasAuthToken() {
    return !!Token.getAuthToken();
  },
};

export default Token;
