import React, { createContext, useContext, useState, useEffect } from 'react';
import tokenStore, { localStorageTokenStorage } from '../lib/tokenStore';
import ApiService from '../services/apiService';

interface UserProfile {
  userId: string;
  age: number;
  gender: string;
  fitnessLevel: string;
  goals: string[];
  workoutFrequency: string;
  preferredWorkouts: string[];
  hasCompletedOnboarding?: boolean;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  profile?: UserProfile;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Choose your storage strategy here:
  // memoryTokenStorage, localStorageTokenStorage, or sessionStorageTokenStorage
  // For demo, let's use localStorageTokenStorage for persistence
  tokenStore.setStrategy(localStorageTokenStorage);

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('user');
    // Restore tokens from persistent storage if using localStorage/sessionStorage
    const accessToken = tokenStore.getAccessToken();
    const refreshToken = tokenStore.getRefreshToken();
    if (!accessToken && localStorageTokenStorage.getAccessToken()) {
      tokenStore.setAccessToken(localStorageTokenStorage.getAccessToken());
    }
    if (!refreshToken && localStorageTokenStorage.getRefreshToken()) {
      tokenStore.setRefreshToken(localStorageTokenStorage.getRefreshToken());
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      // If access token is missing, try to refresh it
      if (!tokenStore.getAccessToken()) {
        (async () => {
          try {
            // Attempt to refresh the access token (assumes httpOnly cookie is sent automatically)
            const response = await ApiService.refreshTokenNoArgs();
            if (response.success && response.data) {
              const { accessToken, refreshToken } = response.data;
              tokenStore.setAccessToken(accessToken);
              tokenStore.setRefreshToken(refreshToken);
            } else {
              // Refresh failed, clear user and tokens
              setUser(null);
              localStorage.removeItem('user');
              tokenStore.clear();
              window.location.href = '/login';
            }
          } catch {
            setUser(null);
            localStorage.removeItem('user');
            tokenStore.clear();
            window.location.href = '/login';
          }
        })();
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Call the real /auth/login endpoint
    const response = await ApiService.login({ email, password });
    if (response.success && response.data) {
      const { id, accessToken, refreshToken, firstName, lastName, profile } = response.data as any;
      
      // Map backend IUser to local User type
      const localUser: User = {
        id,
        email,
        firstName: firstName || '',
        lastName: lastName || '',
        isActive: true,
        profile: profile ? {
          userId: id,
          age: profile.age || 0,
          gender: profile.gender || '',
          fitnessLevel: profile.fitnessLevel || '',
          goals: profile.goals || [],
          workoutFrequency: profile.workoutFrequency || '',
          preferredWorkouts: profile.preferredWorkouts || [],
          hasCompletedOnboarding: profile.hasCompletedOnboarding || false,
        } : undefined
      };
      
      setUser(localUser);
      localStorage.setItem('user', JSON.stringify(localUser));
      tokenStore.setAccessToken(accessToken);
      tokenStore.setRefreshToken(refreshToken);
    } else {
      throw new Error(response.error?.message || 'Login failed');
    }
  };

  const register = async (email: string, name: string, password: string) => {
    // Split name into firstName and lastName for backend
    const [firstName, ...lastNameArr] = name.split(' ');
    const lastName = lastNameArr.join(' ');
    
    // Call the real /auth/register endpoint
    const response = await ApiService.register({ email, password, firstName, lastName });
    if (response.success && response.data) {
      const { id, accessToken, refreshToken, firstName, lastName } = response.data as any;
      
      // Map backend IUser to local User type
      const localUser: User = {
        id,
        email,
        firstName: firstName || '',
        lastName: lastName || '',
        isActive: true,
        profile: {
          userId: id,
          age: 0,
          gender: '',
          fitnessLevel: '',
          goals: [],
          workoutFrequency: '',
          preferredWorkouts: [],
          hasCompletedOnboarding: false,
        }
      };
      
      setUser(localUser);
      localStorage.setItem('user', JSON.stringify(localUser));
      tokenStore.setAccessToken(accessToken);
      tokenStore.setRefreshToken(refreshToken);
    } else {
      throw new Error(response.error?.message || 'Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    // Clear all auth-related data
    localStorage.removeItem('user');
    tokenStore.clear();
  };

  const updateProfile = (profile: Partial<UserProfile>) => {
    if (user) {
      const updatedUser: User = {
        ...user,
        profile: user.profile ? { ...user.profile, ...profile } : {
          userId: user.id,
          age: 0,
          gender: '',
          fitnessLevel: '',
          goals: [],
          workoutFrequency: '',
          preferredWorkouts: [],
          ...profile
        }
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const completeOnboarding = () => {
    if (user) {
      const updatedUser: User = {
        ...user,
        profile: user.profile ? {
          ...user.profile,
          hasCompletedOnboarding: true
        } : {
          userId: user.id,
          age: 0,
          gender: '',
          fitnessLevel: '',
          goals: [],
          workoutFrequency: '',
          preferredWorkouts: [],
          hasCompletedOnboarding: true
        }
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // Derive isAuthenticated from the presence of a user
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      logout,
      updateProfile,
      completeOnboarding
    }}>
      {children}
    </AuthContext.Provider>
  );
};