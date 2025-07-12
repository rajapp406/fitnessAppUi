import React from 'react';
import { WorkoutCard } from './WorkoutCard';

interface Workout {
  title: string;
  duration: string;
  type: string;
  difficulty: string;
  image: string;
}

interface WorkoutSectionProps {
  title: string;
  subtitle?: string;
  workouts: Workout[];
  onWorkoutClick?: (workout: Workout) => void;
  className?: string;
}

export const WorkoutSection: React.FC<WorkoutSectionProps> = ({
  title,
  subtitle,
  workouts,
  onWorkoutClick,
  className = '',
}) => {
  if (workouts.length === 0) {
    return null;
  }

  return (
    <section className={className}>
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        {subtitle && <p className="text-gray-600 text-sm mt-1">{subtitle}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((workout, index) => (
          <WorkoutCard
            key={index}
            title={workout.title}
            duration={workout.duration}
            type={workout.type}
            difficulty={workout.difficulty}
            image={workout.image}
            onClick={() => onWorkoutClick?.(workout)}
          />
        ))}
      </div>
    </section>
  );
};

export default WorkoutSection;
