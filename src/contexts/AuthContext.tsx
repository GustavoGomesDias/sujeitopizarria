import React, { useState, createContext, ReactNode } from 'react';
import { ProviderProps } from '../types/ProviderProps';

type UserProps = {
  id: string
  name: string
  email: string
  token: string
}

export interface AuthContextData {
  user: UserProps
  isAuthenticated: boolean
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<UserProps>({
    id: '',
    name: '',
    email: '',
    token: '',
  });

  const isAuthenticated = !!user.name;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}