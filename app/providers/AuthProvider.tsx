import {
  createContext,
  useContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';
import { useAuthInit } from '~/hooks/useAuthInit';
import type { AuthUser } from '~/types/Auth';

interface AuthContextType {
  user: AuthUser | null;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, setUser } = useAuthInit();

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
