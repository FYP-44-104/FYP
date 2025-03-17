import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth, UseAuthReturn } from '../hooks/useAuth';

// Create the context
const AuthContext = createContext<UseAuthReturn | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useAuth();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useAuthContext = (): UseAuthReturn => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthProvider; 