import axios from 'axios';
import Token from './token';

export const getSheets = async () => {
  const res = await axios(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sheet`);
  return res.data;
};

export const getSheet = async (id: number) => {
  if (id) {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sheet/${id}`
    );
    return res.data;
  }
};

export const getFavorites = async () => {
  if (Token.hasAuthToken()) {
    const token = Token.getAuthToken();

    const fetchConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/favorites`,
      fetchConfig
    );
    return res.data;
  }
};
