import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '../redux';
import { setProfile, updateProfile as updateProfileAction, setProfileLoading } from '../../store/slices/userSlice';
import { updateUser } from '../../store/slices/authSlice';
import { userApi, UserProfile } from '../../services/api';

export const useUserProfile = () => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: ['userProfile'],
    queryFn: userApi.getProfile,
    onSuccess: (data) => {
      dispatch(setProfile(data));
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateProfile = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.updateProfile,
    onMutate: () => {
      dispatch(setProfileLoading(true));
    },
    onSuccess: (data) => {
      dispatch(updateProfileAction(data));
      dispatch(setProfileLoading(false));
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
    onError: () => {
      dispatch(setProfileLoading(false));
    },
  });
};

export const useCompleteOnboarding = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.completeOnboarding,
    onSuccess: () => {
      dispatch(updateUser({ hasCompletedOnboarding: true }));
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });
};