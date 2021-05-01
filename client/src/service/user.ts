import config from '../config';

const Users = {
  register(newUser) {
    return fetch(`${config.API_ENDPOINT}/user`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newUser),
    }).then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      } else {
        return res;
      }
    });
  },
};

export default Users;
