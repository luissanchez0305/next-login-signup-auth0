import React, { ReactNode, ReactElement } from 'react';
import { APIClient, Logger } from '../../core';
import util from 'util';

type AuthContext = {
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = React.createContext<AuthContext>({
  isAuthenticated: false,
  isLoading: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAuthenticated: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [isAuthenticated, setAuthenticated] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const apiClient = APIClient.getInstance();
  const logger = new Logger();

  React.useEffect(() => {
    const initializeAuth = async (): Promise<void> => {
      const response = await apiClient.users.getProfile();
      setAuthenticated(response.status === 200);
      setLoading(false);
    };

    initializeAuth();
  });
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        setAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContext {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function userIsAuthenticated(): boolean {
  const context = useAuth();
  return context.isAuthenticated;
}
