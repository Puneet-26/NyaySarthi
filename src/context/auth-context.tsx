'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import {
  onAuthStateChanged,
  signOut,
  type User,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import type { LoginData } from '@/lib/types';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (data: LoginData) => Promise<any>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // If we have a mock user from our prototype login, don't overwrite it
      if (user || !sessionStorage.getItem('mockUser')) {
         setUser(user);
      }
      setLoading(false);
    });

     // Check for mock user on initial load
    const mockUserJson = sessionStorage.getItem('mockUser');
    if (mockUserJson) {
      setUser(JSON.parse(mockUserJson));
    }


    return () => {
      unsubscribe();
    }
  }, []);

  const login = async (data: LoginData) => {
    const mockUser = {
      uid: 'mock-user-id',
      email: data.email,
      displayName: 'Prototype User',
      // Add other User properties as needed, with default/mock values
      emailVerified: true,
      isAnonymous: false,
      photoURL: null,
      providerId: 'password',
      metadata: {},
      providerData: [],
      refreshToken: 'mock-token',
      tenantId: null,
      delete: async () => {},
      getIdToken: async () => 'mock-id-token',
      getIdTokenResult: async () => ({
        token: 'mock-id-token',
        expirationTime: '',
        authTime: '',
        issuedAtTime: '',
        signInProvider: null,
        signInSecondFactor: null,
        claims: {},
      }),
      reload: async () => {},
      toJSON: () => ({}),
    } as User;

    sessionStorage.setItem('mockUser', JSON.stringify(mockUser));
    setUser(mockUser);
    return Promise.resolve();
  };

  const logout = () => {
    sessionStorage.removeItem('mockUser');
    setUser(null);
    return signOut(auth);
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
