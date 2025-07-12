import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Dumbbell, Target, Trophy, Calendar, TrendingUp, User, Settings, Play, Clock, Siren as Fire, Award } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const stats = [
    {
      title: 'Workouts This Week',
      value: '4',
      icon: Dumbbell,
      color: 'from-blue-600 to-blue-700',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      title: 'Calories Burned',
      value: '1,240',
      icon: Fire,
      color: 'from-orange-600 to-orange-700',
      bgColor: 'from-orange-50 to-orange-100'
    },
    {
      title: 'Active Minutes',
      value: '180',
      icon: Clock,
      color: 'from-green-600 to-green-700',
      bgColor: 'from-green-50 to-green-100'
    },
    {
      title: 'Achievements',
      value: '12',
      icon: Award,
      color: 'from-purple-600 to-purple-700',
      bgColor: 'from-purple-50 to-purple-100'
    }
  ];

  const workouts = [
    {
      title: 'Morning Cardio',
      duration: '30 min',
      type: 'Cardio',
      difficulty: 'Beginner',
      image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Strength Training',
      duration: '45 min',
      type: 'Strength',
      difficulty: 'Intermediate',
      image: 'https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Yoga Flow',
      duration: '25 min',
      type: 'Flexibility',
      difficulty: 'Beginner',
      image: 'https://images.pexels.com/photos/3822187/pexels-photo-3822187.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">FitTrack</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              <button 
                onClick={logout}
                className="text-red-600 hover:text-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName! + " " + user?.lastName!}! 👋
          </h2>
          <p className="text-gray-600">
            Ready to crush your fitness goals today?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`bg-gradient-to-r ${stat.bgColor} p-3 rounded-xl`}>
                  <stat.icon className={`h-6 w-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                </div>
              </div>
            </div>
          ))}
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

export default Dashboard;