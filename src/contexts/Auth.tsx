import {
  createContext, ReactNode, useContext, useEffect, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  SignUpBody, SignInBody, signIn, signUp,
} from '../services/api/users';
import * as storage from '../services/localStorage';

interface IAuthContext {
  authToken?: string;
  loading: boolean;
  signIn: (values: SignInBody) => Promise<void>
  signUp: (values: SignUpBody) => Promise<void>
  signOut: () => void
}

const noop = () => ({}) as any;

const AuthContext = createContext<IAuthContext>(
  {
    signUp: noop, signIn: noop, signOut: noop, loading: false,
  },
);

export const AuthProvider = (
  { children }: { children: ReactNode },
): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [authToken, setAuthToken] = useState<string>('');
  const history = useHistory();

  useEffect(() => {
    const token = storage.getItem('authToken');

    if (token) {
      setAuthToken(token);
      history.push('/dashboard');
    }
  }, []);

  const signInImplementation = async (values: SignInBody) => {
    setLoading(true);

    try {
      const credentials = await signIn(values);

      const token = credentials.data.session_token;

      setAuthToken(token);

      storage.setItem('authToken', token);

      history.push('/dashboard');
    } catch (error) {
      if (error?.response?.status === 401) {
        toast(
          'Verifique se suas credenciais estão corretas',
          { type: 'error' },
        );
      } else {
        toast(
          'Erro não identificado',
          { type: 'error' },
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const signUpImplementation = async (values: SignUpBody) => {
    setLoading(true);

    try {
      await signUp(values);

      toast('Conta criada com sucesso', { type: 'success' });
      history.push('/');
    } catch (error) {
      if (error?.response?.status === 400) {
        toast(
          'Já existe um usuário cadastrado com esse email',
          { type: 'error' },
        );
      } else {
        toast(
          'Erro não identificado',
          { type: 'error' },
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const signOutImplementation = () => {
    storage.removeItem('authToken');
    history.push('/');
  };

  return (
    <AuthContext.Provider value={{
      loading,
      signIn: signInImplementation,
      signUp: signUpImplementation,
      signOut: signOutImplementation,
      authToken,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => useContext(AuthContext);
