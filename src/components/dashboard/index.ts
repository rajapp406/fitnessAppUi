export { default as AppHeader } from './AppHeader';
export { default as WelcomeSection } from './WelcomeSection';
export { default as StatCard } from './StatCard';
export { default as StatsSection } from './StatsSection';
export { default as WorkoutCard } from './WorkoutCard';
export { default as WorkoutSection } from './WorkoutSection';

export interface StatItem {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
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
