import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '../redux';
import { loginStart, loginSuccess, loginFailure, logout } from '../../store/slices/authSlice';
import { resetUserState } from '../../store/slices/userSlice';
import { authApi } from '../../services/api';
import tokenStore from '../../lib/tokenStore';

export const useLogin = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: authApi.login,
    onMutate: () => {
      dispatch(loginStart());
    },
    onSuccess: (data) => {
      dispatch(loginSuccess(data.user));
      tokenStore.setAccessToken(data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    },
    onError: (error: Error) => {
      dispatch(loginFailure(error.message || 'Login failed'));
    },
  });
};

export const useRegister = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: authApi.register,
    onMutate: () => {
      dispatch(loginStart());
    },
    onSuccess: (data) => {
      dispatch(loginSuccess(data.user));
      tokenStore.setAccessToken(data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    },
    onError: (error: Error) => {
      dispatch(loginFailure(error.message || 'Registration failed'));
    },
  });
};

export const useLogout = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async () => {
      // Clear local storage
      tokenStore.setAccessToken(null);
      localStorage.removeItem('user');
    },
    onSuccess: () => {
      dispatch(logout());
      dispatch(resetUserState());
    },
  });
};