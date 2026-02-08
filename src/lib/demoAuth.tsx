/**
 * Demo Authentication Context
 * Works without Clerk/Supabase API keys - uses localStorage
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'founder' | 'investor' | 'team';

export interface DemoUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: DemoUser | null;
  isLoading: boolean;
  signIn: (role: UserRole) => void;
  signOut: () => void;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing demo session
    const savedUser = localStorage.getItem('pitchflow_demo_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const signIn = (role: UserRole) => {
    const demoUsers: Record<UserRole, DemoUser> = {
      founder: {
        id: 'demo-founder-001',
        email: 'founder@techflow.ai',
        name: 'Demo Founder',
        role: 'founder',
      },
      investor: {
        id: 'demo-investor-001',
        email: 'investor@venture.cap',
        name: 'Demo Investor',
        role: 'investor',
      },
      team: {
        id: 'demo-team-001',
        email: 'dev@techflow.ai',
        name: 'Demo Team Member',
        role: 'team',
      },
    };

    const demoUser = demoUsers[role];
    setUser(demoUser);
    localStorage.setItem('pitchflow_demo_user', JSON.stringify(demoUser));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('pitchflow_demo_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut, isDemoMode: true }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useDemoAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useDemoAuth must be used within DemoAuthProvider');
  }
  return context;
}

