import { createContext, useCallback, useContext, useEffect, useState } from 'react';
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

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider: React.FC = ({ children }) => {
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
          const response = await api.get('/profile');
          setUser(response.data);
        } catch {}
      }
    };
    getUser();
  }, []);

  const signIn = useCallback(async ({ email, password }: UserData) => {
    const base64encodedData = btoa(email + ':' + password);

    api.defaults.headers['authorization'] = `Basic ${base64encodedData}`;
    const response = await api.post('/signIn');
    // console.log(response)

    const { token } = response.data;

    localStorage.setItem('@PermissionYT:token', token);
    api.defaults.headers['authorization'] = `Bearer ${token}`;

    setToken({ token } as TokenState);
    navigate('/dashboard', { replace: true });
  }, []);

  const signOut = useCallback(async () => {
    await api.get('/logout');

    setToken({} as TokenState);

    localStorage.removeItem('@PermissionYT:token');

    delete api.defaults.headers['authorization'];
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
