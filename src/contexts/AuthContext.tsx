import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ProviderProps } from '../types/ProviderProps';
import { SignInProps } from '../types/usecases/signin';

type UserProps = {
  id: number
  name: string
  email: string
  token: string
}

export interface AuthContextData {
  user: UserProps
  isAuthenticated: boolean
  signIn: (credentials: SignInProps) => Promise<void>
  signOut: () => Promise<void>
  isLoading: boolean
  loading: boolean
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<UserProps>({
    id: -1,
    name: '',
    email: '',
    token: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getUser() {
      const userInfo = await AsyncStorage.getItem('@sujeitopizzaria');
      let hasUser: UserProps = JSON.parse(userInfo || '{}');

      if (Object.keys(hasUser).length > 0) {
        setUser({ ...hasUser });
      }
      setLoading(false);
    }

    getUser();
  }, []);

  const isAuthenticated = !!user.name;

  const signIn = async ({ email, password }: SignInProps): Promise<void> => {
    setIsLoading(true);

    if (email !== 'gustavo@teste.com' || password !== 'teste123') {
      setUser({
        id: -1,
        name: '',
        email: '',
        token: '',
      });
      setTimeout(() => {setIsLoading(false)}, 1000);
      
      return;
    }

    try {
      const response = await Promise.resolve({
        data: {
          id: 1,
          email: 'gustavo@teste.com',
          name: 'Gustavo',
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJndXN0YXZvQHRlc3RlLmNvbSIsIm5hbWUiOiJHdXN0YXZvIiwiaWF0IjoxNjUzMzM1MzMxLCJleHAiOjE2NTM1MDgxMzF9.1hnTnh4kHgWVLU1NX55SX8JV0sRTwAdE6NCru57V-cY',
        },
      });

      const { id, name, email, token } = response.data;
      const data = {
        ...response.data
      }
      // Persiste para quando o usuário sair
      await AsyncStorage.setItem('@sujeitopizzaria', JSON.stringify(data));
      setUser({
        id, name, email, token,
      });

      setIsLoading(false);
    } catch (err) {
      console.log(err)
      setIsLoading(false);
    }
  }

  async function signOut() {
    await AsyncStorage.clear().then(() => {
      setUser({
        id: -1,
        name: '',
        email: '',
        token: '',
      });
    });
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      signIn,
      isLoading,
      loading,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}