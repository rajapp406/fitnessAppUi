import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '../redux';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import { socialAuthManager, SocialAuthResult } from '../../services/socialAuth';
import tokenStore from '../../lib/tokenStore';

export const useSocialLogin = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (provider: string): Promise<SocialAuthResult> => {
      dispatch(loginStart());
      return socialAuthManager.loginWith(provider);
    },
    onSuccess: (data) => {
      const user = {
        id: `${data.provider}_${data.user.id}`,
        email: data.user.email,
        name: data.user.name,
        hasCompletedOnboarding: false,
      };

      dispatch(loginSuccess(user));
      tokenStore.setAccessToken(data.token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('authProvider', data.provider);
    },
    onError: (error: Error) => {
      dispatch(loginFailure(error.message || 'Social login failed'));
    },
  });
};

export const useSocialLogout = () => {
  return useMutation({
    mutationFn: async (provider: string) => {
      await socialAuthManager.logoutFrom(provider);
      localStorage.removeItem('authProvider');
    },
  });
};