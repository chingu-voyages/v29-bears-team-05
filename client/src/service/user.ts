const Users = {
  register(newUser) {
    return fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user`, {
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
