import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';

interface AuthContextState {
  isLogeed: boolean;
  signIn({ email, password }: UserData): Promise<void>;
  signOut(): Promise<void>;
  user: any;
}

interface UserData {
  email: string;
  password: string;
}

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [isLogeed, setIsLogeed] = useState(() => {
    const token = localStorage.getItem('@PermissionYT:token');
    if (token) return true;
    return false;
  });
  const [user, setUser] = useState(null);

  const getUser = useCallback(async () => {
    try {
      const response = await api.get('/profiles');
      setUser(response.data);
    } catch {}
  }, []);

  const signIn = useCallback(async ({ email, password }: UserData) => {
    const base64encodedData = btoa(email + ':' + password);

    api.defaults.headers['Authorization'] = `Basic ${base64encodedData}`;
    const response = await api.post('/signIn');

    const { token } = response.data;

    localStorage.setItem('@PermissionYT:token', token);

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    await getUser();
  }, []);

  const signOut = useCallback(async () => {
    await api.get('/logout');

    localStorage.removeItem('@PermissionYT:token');

    delete api.defaults.headers['Authorization'];
  }, []);

  useEffect(() => {
    if (isLogeed) getUser();
  }, []);

  return <AuthContext.Provider value={{ isLogeed, signIn, user, signOut }}>{children}</AuthContext.Provider>;
};

function useAuth(): AuthContextState {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
