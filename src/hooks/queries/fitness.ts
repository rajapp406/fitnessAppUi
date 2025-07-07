import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fitnessApi } from '../../services/api';

export const useWorkouts = () => {
  return useQuery({
    queryKey: ['workouts'],
    queryFn: fitnessApi.getWorkouts,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useUserStats = () => {
  return useQuery({
    queryKey: ['userStats'],
    queryFn: fitnessApi.getUserStats,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};

export const useStartWorkout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fitnessApi.startWorkout,
    onSuccess: () => {
      // Invalidate and refetch user stats after starting a workout
      queryClient.invalidateQueries({ queryKey: ['userStats'] });
    },
  });
};