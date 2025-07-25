import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Clock, Play, Target, Calendar, Box } from 'lucide-react';
import WorkoutPlanViewer from './workout/WorkoutPlanViewer';
import workoutPlanMock, { stats, workouts } from './mocks/WorkoutPlanMock';
import AppHeader from './dashboard/AppHeader';
import WelcomeSection from './dashboard/WelcomeSection';
import StatsSection from './dashboard/StatsSection';
import WorkoutSection from './dashboard/WorkoutSection';
import workoutService from '../services/workoutService';
import { Workout, WorkoutPlan } from '../types';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | any>(null);

  

  const handleWorkoutClick = (workout: Workout) => {
    setSelectedWorkout(workout);
  };

  const handleCloseWorkoutViewer = () => {
    setSelectedWorkout(null);
  };

  const handleSettingsClick = () => {
    // TODO: Implement settings navigation
    console.log('Settings clicked');
  };
  useEffect(() => {
    const request = {
      user_id: 'user123',
      fitness_level: 'intermediate',
      goal: 'Muscle building',
      day: 2
    };  
    workoutService.getLanggraphWorkout(request).then((response) => {
      setWorkoutPlan(response);
    });
  }, []);

const userName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'there' : 'there';

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader 
        userName={userName}
        onLogout={logout} 
        onSettingsClick={handleSettingsClick}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeSection 
          userName={userName}
          subtitle="Let's crush your fitness goals today! 💪" 
        />

        <StatsSection stats={stats} className="mb-8" />
        
        <WorkoutSection
          title="Today's Workouts"
          subtitle="Your personalized workout recommendations"
          workouts={workouts}
          onWorkoutClick={handleWorkoutClick}
          className="mb-8"
        />

        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Your AI-Generated Workout Plan</h3>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          { workoutPlan ? (
            <WorkoutPlanViewer 
              plan={workoutPlan} 
            />
          ) : (
            <Box><h1>Loading....</h1></Box>
          )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recommended Workouts */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Recommended Workouts
                </h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>
              
              <div className="grid gap-4">
                {workouts.map((workout, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
                    <img 
                      src={workout.image} 
                      alt={workout.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{workout.title}</h4>
                      <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {workout.duration}
                        </span>
                        <span>{workout.type}</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                          {workout.difficulty}
                        </span>
                      </div>
                    </div>
                    <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Play className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & Progress */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-left border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Play className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Start Quick Workout</div>
                    <div className="text-sm text-gray-600">15 min routine</div>
                  </div>
                </button>
                
                <button className="w-full flex items-center gap-3 p-3 text-left border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Target className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Log Activity</div>
                    <div className="text-sm text-gray-600">Track your progress</div>
                  </div>
                </button>
                
                <button className="w-full flex items-center gap-3 p-3 text-left border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Schedule Workout</div>
                    <div className="text-sm text-gray-600">Plan your week</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Progress */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Weekly Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Workouts</span>
                    <span className="font-medium">4/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Calories Goal</span>
                    <span className="font-medium">1,240/1,500</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-orange-600 to-red-600 h-2 rounded-full" style={{ width: '83%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Active Minutes</span>
                    <span className="font-medium">180/200</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-600 to-teal-600 h-2 rounded-full" style={{ width: '90%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the component as default
export default Dashboard;