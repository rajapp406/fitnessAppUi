import type { LucideIcon } from 'lucide-react';

export interface StatItem {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export interface Workout {
  title: string;
  duration: string;
  type: string;
  difficulty: string;
  image: string;
}

export interface Exercise {
  name: string;
  sets?: number;
  reps?: string;
  rest?: string;
  equipment?: string;
}

export interface WorkoutPlan {
  date: string;
  day: string;
  workout_type: string;
  focus_area: string;
  exercises: Exercise[];
  warm_up: Array<{ name: string; duration: string }>;
  cool_down: Array<{ name: string; duration: string }>;
  duration: string;
  intensity: string;
  notes: string;
}

export interface WorkoutPlanViewerProps {
  plan: WorkoutPlan;
  onClose?: () => void;
}
