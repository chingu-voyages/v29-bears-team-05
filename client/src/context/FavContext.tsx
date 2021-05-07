import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getFavorites } from '../service/queryFns';

const FavsContext = createContext([]);

export const FavsProvider = ({ children }) => {
  const { data } = useQuery('favorites', getFavorites);

  const initialState = data?.user?.userFavorites?.map((el) => el.id) || [];
  const [favs, setFavs] = useState(initialState);
  console.log('favs', favs);

  return (
    <FavsContext.Provider value={{ favs, setFavs }}>
      {children}
    </FavsContext.Provider>
  );
};

export const useFavs = () => {
  return useContext(FavsContext);
};
