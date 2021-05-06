import { createContext, useContext, useState } from 'react';

const FavsContext = createContext([]);

export const FavsProvider = ({ children }) => {
  const initialState = []; // fill with current favs from query client cache
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
