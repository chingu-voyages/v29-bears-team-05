import config from '../config';

const Auth = {
  login(credentials) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(credentials),
    }).then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      } else {
        return res.json();
      }
    });
  },
  saveUsername(username) {
    window.localStorage.setItem('username', username);
  },
  getUsername() {
    return window.localStorage.getItem('username');
  },
};

export default Auth;
