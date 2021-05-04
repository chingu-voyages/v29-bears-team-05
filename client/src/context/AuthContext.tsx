import { createContext, useContext, useEffect, useState } from 'react';
import Token from '../service/token';

const AuthContext = createContext<boolean | null>(null);

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthenticated(Token.hasAuthToken() && !Token.isExpired());
  }, []);

  return (
    <AuthContext.Provider value={authenticated}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
