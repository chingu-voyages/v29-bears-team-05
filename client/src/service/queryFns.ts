import axios from 'axios';
import config from '../config';

export const getSheets = async () => {
  const res = await axios(`${config.API_ENDPOINT}/sheet`);
  return res.data;
};

export const getSheet = async (id: number) => {
  if (id) {
    const res = await axios(`${config.API_ENDPOINT}/sheet/${id}`);
    return res.data;
  }
};

export const getFavorites = async () => {
  const res = await axios(`${config.API_ENDPOINT}/user/favorites`);
  return res.data;
};
