// API base configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3900/api/v1';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface SocialLoginRequest {
  provider: string;
  token: string;
  userData: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  hasCompletedOnboarding: boolean;
  avatar?: string;
  provider?: string;
}

export interface UserProfile {
  age: string;
  gender: string;
  fitnessLevel: string;
  goals: string[];
  workoutFrequency: string;
  preferredWorkouts: string[];
}

export interface Workout {
  id: string;
  title: string;
  duration: string;
  type: string;
  difficulty: string;
  image: string;
  description?: string;
}

export interface UserStats {
  workoutsThisWeek: number;
  caloriesBurned: number;
  activeMinutes: number;
  achievements: number;
}

// Auth API
export const authApi = {
  login: async (credentials: LoginRequest): Promise<{ user: User; token: string }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock response
    const user: User = {
      id: '1',
      email: credentials.email,
      name: credentials.email.split('@')[0],
      hasCompletedOnboarding: false,
    };
    
    return {
      user,
      token: 'mock-jwt-token',
    };
  },

  register: async (userData: RegisterRequest): Promise<{ user: User; token: string }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock response
    const user: User = {
      id: '1',
      email: userData.email,
      name: userData.name,
      hasCompletedOnboarding: false,
    };
    
    return {
      user,
      token: 'mock-jwt-token',
    };
  },

  socialLogin: async (socialData: SocialLoginRequest): Promise<{ user: User; token: string }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock response
    const user: User = {
      id: `${socialData.provider}_${socialData.userData.id}`,
      email: socialData.userData.email,
      name: socialData.userData.name,
      hasCompletedOnboarding: false,
      avatar: socialData.userData.avatar,
      provider: socialData.provider,
    };
    
    return {
      user,
      token: socialData.token,
    };
  },

  refreshToken: async (): Promise<{ token: string }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { token: 'new-mock-jwt-token' };
  },
};

// User API
export const userApi = {
  getProfile: async (): Promise<UserProfile> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock response
    return {
      age: '25',
      gender: 'Male',
      fitnessLevel: 'Intermediate',
      goals: ['Build Muscle', 'Improve Endurance'],
      workoutFrequency: '3-4 times per week',
      preferredWorkouts: ['Strength Training', 'Cardio'],
    };
  },

  updateProfile: async (profile: Partial<UserProfile>): Promise<UserProfile> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock response - in real app, this would merge with existing profile
    return profile as UserProfile;
  },

  completeOnboarding: async (): Promise<{ success: boolean }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  },
};

// Fitness API
export const fitnessApi = {
  getWorkouts: async (): Promise<Workout[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      {
        id: '1',
        title: 'Morning Cardio',
        duration: '30 min',
        type: 'Cardio',
        difficulty: 'Beginner',
        image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: '2',
        title: 'Strength Training',
        duration: '45 min',
        type: 'Strength',
        difficulty: 'Intermediate',
        image: 'https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: '3',
        title: 'Yoga Flow',
        duration: '25 min',
        type: 'Flexibility',
        difficulty: 'Beginner',
        image: 'https://images.pexels.com/photos/3822187/pexels-photo-3822187.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ];
  },

  getUserStats: async (): Promise<UserStats> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return {
      workoutsThisWeek: 4,
      caloriesBurned: 1240,
      activeMinutes: 180,
      achievements: 12,
    };
  },

  startWorkout: async (workoutId: string): Promise<{ success: boolean }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  },
};