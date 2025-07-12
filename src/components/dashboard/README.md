# Dashboard Components

This directory contains the refactored components for the Dashboard page, following the Single Responsibility Principle and clean code practices.

## Component Structure

### AppHeader
- **Props**:
  - `userName: string` - The name of the logged-in user
  - `onLogout: () => void` - Function to handle logout
  - `onSettingsClick?: () => void` - Optional function to handle settings click
- **Description**: The header component displaying the app logo, user name, and action buttons.

### WelcomeSection
- **Props**:
  - `userName: string` - The name of the logged-in user
  - `subtitle?: string` - Optional subtitle text
- **Description**: Displays a welcome message to the user with an optional subtitle.

### StatsSection
- **Props**:
  - `stats: StatItem[]` - Array of stat items to display
  - `className?: string` - Optional CSS class name
- **Description**: A grid of stat cards showing user statistics like workouts, calories, etc.

### WorkoutSection
- **Props**:
  - `title: string` - Section title
  - `subtitle?: string` - Optional subtitle
  - `workouts: Workout[]` - Array of workout items
  - `onWorkoutClick: (workout: Workout) => void` - Handler for workout selection
  - `className?: string` - Optional CSS class name
- **Description**: Displays a list of workout cards with details and interaction options.

### StatCard (Internal)
- **Props**:
  - `title: string` - Stat title
  - `value: string` - Stat value
  - `icon: LucideIcon` - Icon component
  - `color: string` - Gradient color classes
  - `bgColor: string` - Background color classes
- **Description**: A single stat card component used within StatsSection.

### WorkoutCard (Internal)
- **Props**:
  - `workout: Workout` - Workout data
  - `onClick: () => void` - Click handler
- **Description**: A card component displaying workout information.

## Type Definitions

### StatItem
```typescript
interface StatItem {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}
```

### Workout
```typescript
interface Workout {
  title: string;
  duration: string;
  type: string;
  difficulty: string;
  image: string;
}
```

## Usage Example

```tsx
import { 
  AppHeader, 
  WelcomeSection, 
  StatsSection, 
  WorkoutSection,
  type StatItem,
  type Workout 
} from './dashboard';

const Dashboard = () => {
  const stats: StatItem[] = [
    {
      title: 'Workouts This Week',
      value: '4',
      icon: Dumbbell,
      color: 'from-blue-600 to-blue-700',
      bgColor: 'from-blue-50 to-blue-100'
    },
    // ... more stats
  ];

  const workouts: Workout[] = [
    {
      title: 'Morning Cardio',
      duration: '30 min',
      type: 'Cardio',
      difficulty: 'Beginner',
      image: 'path/to/image.jpg'
    },
    // ... more workouts
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader 
        userName="John Doe"
        onLogout={() => {}}
        onSettingsClick={() => {}}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeSection 
          userName="John"
          subtitle="Let's crush your fitness goals today! 💪"
        />
        
        <StatsSection stats={stats} className="mb-8" />
        
        <WorkoutSection
          title="Today's Workouts"
          workouts={workouts}
          onWorkoutClick={(workout) => console.log(workout)}
        />
      </div>
    </div>
  );
};
```
