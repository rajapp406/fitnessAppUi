interface Exercise {
  name: string;
  hint?: string;
  sets?: number;
  reps?: string;
  rest?: string;
  equipment?: string;
  duration?: string;
  youtube?: string;
  description?: string;
}

export interface WorkoutActivity {
  name: string;
  description: string;
  duration?: string;
  reps?: number;
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
      activities: WorkoutActivity[];
      total_duration: string;
    };
    cool_down: {
      activities: WorkoutActivity[];
      total_duration: string;
    };
    intensity: string;
    notes: string;
    today: string;
    tomorrow: string;
  };
  youtube_status: string;
}

interface Exercise {
  name: string;
  sets?: number;
  reps?: string;
  rest?: string;
  equipment?: string;
  duration?: string;
}
