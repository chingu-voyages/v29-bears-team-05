import { createContext, useContext, useEffect, useState } from 'react';
import Token from '../service/token';
interface AuthContextInterface {
  authenticated: boolean | null;
  setAuthenticated: any;
}

const initialContext = {
  authenticated: false,
  setAuthenticated: null,
};

const AuthContext = createContext<AuthContextInterface>(initialContext);

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthenticated(Token.hasAuthToken() && !Token.isExpired());
  }, [authenticated]);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
