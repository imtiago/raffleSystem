import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';

interface AuthContextState {
  token: TokenState;
  signIn({ email, password }: UserData): Promise<void>;
  signOut(): Promise<void>;
  userLogged(): boolean;
  user: any;
}

interface UserData {
  email: string;
  password: string;
}

interface TokenState {
  token: string;
}

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [k, setUs] = useState(false);
  const [token, setToken] = useState<TokenState>(() => {
    const token = localStorage.getItem('@PermissionYT:token');

    if (token !== null) {
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      return { token };
    }

    return {} as TokenState;
  });

  useEffect(() => {
    // const token = localStorage.getItem("@PermissionYT:token");
    // if (token && (location.pathname === '/signUp')) {
    //       navigate('/dashboard', { replace: true });
    // }
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem('@PermissionYT:token');
      if (token) {
        try {
          const response = await api.get('/profiles');
          console.log('response');
          setUser(response.data);
        } catch {}
      }
    };
    getUser();
  }, []);

  const signIn = useCallback(async ({ email, password }: UserData) => {
    const base64encodedData = btoa(email + ':' + password);

    api.defaults.headers['Authorization'] = `Basic ${base64encodedData}`;
    const response = await api.post('/signIn');
    // console.log(response)

    const { token } = response.data;

    localStorage.setItem('@PermissionYT:token', token);
    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    setToken({ token } as TokenState);
    // navigate('/dashboard');
    navigate('/dashboard', { replace: true });
  }, []);

  const signOut = useCallback(async () => {
    await api.get('/logout');

    setToken({} as TokenState);

    localStorage.removeItem('@PermissionYT:token');

    delete api.defaults.headers['Authorization'];
  }, []);

  const userLogged = useCallback(() => {
    const token = localStorage.getItem('@PermissionYT:token');
    if (token) {
      return true;
    }
    return false;
  }, []);

  return <AuthContext.Provider value={{ user, token, signIn, signOut, userLogged }}>{children}</AuthContext.Provider>;
};

function useAuth(): AuthContextState {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
