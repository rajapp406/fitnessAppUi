import axios from 'axios';
import workoutPlanMock from '../components/mocks/WorkoutPlanMock';

// Base URL for the agent-fitness-py service
const WORKOUT_API_BASE_URL = 'http://localhost:8000';

// Types based on the mock data
export interface Exercise {
  name: string;
  hint: string;
  sets: number;
  reps: string;
  rest: string;
  equipment: string;
  youtube: string;
}

export interface WarmUpActivity {
  name: string;
  description: string;
  duration: string;
  youtube?: string;
}

export interface CoolDownActivity {
  name: string;
  description: string;
  duration: string;
  youtube?: string;
}

export interface WorkoutPlan {
  user_id: string;
  fitness_level: string;
  goal: string;
  day: number;
  workout: {
    date: string;
    day: string;
    workout_type: string;
    focus_area: string;
    exercises: Exercise[];
    duration: string;
    warm_up: {
      activities: WarmUpActivity[];
      duration: string;
    };
    cool_down: {
      activities: CoolDownActivity[];
      duration: string;
    };
    notes: string;
  };
}

export interface WorkoutRequest {
  user_id: string;
  fitness_level: string;
  goal: string;
  day: number;
}

/**
 * Fetches a workout plan for the specified user and day
 * @param request The workout request parameters
 * @returns A promise that resolves to the workout plan
 */
export const getDailyWorkout = async (
  request: WorkoutRequest
): Promise<WorkoutPlan> => {
  try {
    const response = await axios.post<WorkoutPlan>(
      `${WORKOUT_API_BASE_URL}/workout/daily`,
      request,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    console.error('Error fetching workout plan:', error);
    const errorMessage = error && 
      typeof error === 'object' &&
      'response' in error &&
      error.response &&
      typeof error.response === 'object' &&
      'data' in error.response &&
      error.response.data &&
      typeof error.response.data === 'object' &&
      'message' in error.response.data
        ? String(error.response.data.message)
        : 'Failed to fetch workout plan';
    throw new Error(errorMessage);
  }
};

/**
 * Fetches a workout plan using the langgraph workflow
 * @param request The workout request parameters
 * @returns A promise that resolves to the enhanced workout plan
 */
export const getLanggraphWorkout = async (
  request: WorkoutRequest
): Promise<WorkoutPlan> => {
  try {
    return workoutPlanMock as any;
    const response = await axios.post<WorkoutPlan>(
      `${WORKOUT_API_BASE_URL}/workflow/langgraph-daily`,
      request,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return workoutPlanMock as any;
    return response.data;
  } catch (error: unknown) {
    console.error('Error fetching langgraph workout plan:', error);
    const errorMessage = error && 
      typeof error === 'object' &&
      'response' in error &&
      error.response &&
      typeof error.response === 'object' &&
      'data' in error.response &&
      error.response.data &&
      typeof error.response.data === 'object' &&
      'message' in error.response.data
        ? String(error.response.data.message)
        : 'Failed to fetch enhanced workout plan';
    throw new Error(errorMessage);
  }
};

export default {
  getDailyWorkout,
  getLanggraphWorkout,
};