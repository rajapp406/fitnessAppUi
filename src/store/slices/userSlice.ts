import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
  age: string;
  gender: string;
  fitnessLevel: string;
  goals: string[];
  workoutFrequency: string;
  preferredWorkouts: string[];
}

interface UserState {
  profile: UserProfile | null;
  onboardingStep: number;
  isProfileLoading: boolean;
}

const initialState: UserState = {
  profile: null,
  onboardingStep: 0,
  isProfileLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      } else {
        state.profile = action.payload as UserProfile;
      }
    },
    setOnboardingStep: (state, action: PayloadAction<number>) => {
      state.onboardingStep = action.payload;
    },
    setProfileLoading: (state, action: PayloadAction<boolean>) => {
      state.isProfileLoading = action.payload;
    },
    resetUserState: (state) => {
      state.profile = null;
      state.onboardingStep = 0;
      state.isProfileLoading = false;
    },
  },
});

export const {
  setProfile,
  updateProfile,
  setOnboardingStep,
  setProfileLoading,
  resetUserState,
} = userSlice.actions;

export default userSlice.reducer;