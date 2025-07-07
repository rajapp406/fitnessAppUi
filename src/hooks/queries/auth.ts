import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '../redux';
import { loginStart, loginSuccess, loginFailure, logout } from '../../store/slices/authSlice';
import { resetUserState } from '../../store/slices/userSlice';
import { authApi, LoginRequest, RegisterRequest } from '../../services/api';

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onMutate: () => {
      dispatch(loginStart());
    },
    onSuccess: (data) => {
      dispatch(loginSuccess(data.user));
      localStorage.setItem('token', data.token);
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
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    },
    onError: (error: Error) => {
      dispatch(loginFailure(error.message || 'Registration failed'));
    },
  });
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    onSuccess: () => {
      dispatch(logout());
      dispatch(resetUserState());
      queryClient.clear();
    },
  });
};