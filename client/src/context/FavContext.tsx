import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getFavorites } from '../service/queryFns';

interface FavsContextInterface {
  favs: any[] | null;
  setFavs: any | null;
}

const initialContext = {
  favs: null,
  setFavs: null,
};
const FavsContext = createContext<FavsContextInterface>(initialContext);

export const FavsProvider = ({ children }) => {
  const { data } = useQuery('favorites', getFavorites);

  // const initialState = data?.user?.userFavorites?.map((el) => el.id) || [];
  const [favs, setFavs] = useState([]);
  console.log('favs', favs);

  useEffect(() => {
    setFavs(data?.user?.userFavorites?.map((el) => el.id) || []);
  }, [data]);

  return (
    <FavsContext.Provider value={{ favs, setFavs }}>
      {children}
    </FavsContext.Provider>
  );
};

export const useFavs = () => {
  return useContext(FavsContext);
};
