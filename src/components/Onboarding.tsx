import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import ApiService from '../services/apiService';
import { ChevronLeft, ChevronRight, User, Target, Activity, Calendar, Check } from 'lucide-react';

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    fitnessLevel: '',
    goals: [] as string[],
    workoutFrequency: '',
    preferredWorkouts: [] as string[]
  });
  
  const { updateProfile, completeOnboarding } = useAuth();
  const navigate = useNavigate();

  const steps = [
    {
      title: 'Personal Information',
      icon: User,
      component: PersonalInfo
    },
    {
      title: 'Fitness Goals',
      icon: Target,
      component: FitnessGoals
    },
    {
      title: 'Current Level',
      icon: Activity,
      component: FitnessLevel
    },
    {
      title: 'Workout Preferences',
      icon: Calendar,
      component: WorkoutPreferences
    }
  ];

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        setIsSubmitting(true);
        // Update local state first for immediate feedback
        updateProfile(formData);
        
        // Send data to the backend
        await ApiService.updateProfile({
          ...formData,
          hasCompletedOnboarding: true
        });
        
        // Mark onboarding as complete
        completeOnboarding();
        
        // Navigate to dashboard
        navigate('/app/dashboard');
      } catch (error) {
        console.error('Failed to update profile:', error);
        // You might want to show an error message to the user here
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.age && formData.gender;
      case 1:
        return formData.goals.length > 0;
      case 2:
        return formData.fitnessLevel;
      case 3:
        return formData.workoutFrequency && formData.preferredWorkouts.length > 0;
      default:
        return false;
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Let's personalize your experience
            </h1>
            <div className="text-sm text-gray-500">
              {currentStep + 1} of {steps.length}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              {React.createElement(steps[currentStep].icon, { className: "h-6 w-6 text-white" })}
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              {steps[currentStep].title}
            </h2>
          </div>

          <CurrentStepComponent formData={formData} setFormData={setFormData} />
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={!isStepValid() || isSubmitting}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {currentStep === steps.length - 1 ? 'Completing...' : 'Loading...'}
              </>
            ) : currentStep === steps.length - 1 ? (
              <>
                Complete
                <Check className="h-5 w-5" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Step Components
function PersonalInfo({ formData, setFormData }: any) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Age
        </label>
        <input
          type="number"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Enter your age"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Gender
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {['Male', 'Female', 'Other'].map((gender) => (
            <button
              key={gender}
              type="button"
              onClick={() => setFormData({ ...formData, gender })}
              className={`p-4 rounded-xl border-2 transition-all ${
                formData.gender === gender
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {gender}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FitnessGoals({ formData, setFormData }: any) {
  const goals = [
    'Lose Weight',
    'Build Muscle',
    'Improve Endurance',
    'Increase Strength',
    'Stay Healthy',
    'Improve Flexibility'
  ];

  const toggleGoal = (goal: string) => {
    const newGoals = formData.goals.includes(goal)
      ? formData.goals.filter((g: string) => g !== goal)
      : [...formData.goals, goal];
    setFormData({ ...formData, goals: newGoals });
  };

  return (
    <div>
      <p className="text-gray-600 mb-6">
        Select all that apply to you (you can choose multiple):
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {goals.map((goal) => (
          <button
            key={goal}
            type="button"
            onClick={() => toggleGoal(goal)}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              formData.goals.includes(goal)
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {goal}
          </button>
        ))}
      </div>
    </div>
  );
}

function FitnessLevel({ formData, setFormData }: any) {
  const levels = [
    {
      level: 'Beginner',
      description: 'New to fitness or returning after a long break'
    },
    {
      level: 'Intermediate',
      description: 'Some experience with regular exercise'
    },
    {
      level: 'Advanced',
      description: 'Experienced with consistent training'
    }
  ];

  return (
    <div>
      <p className="text-gray-600 mb-6">
        What best describes your current fitness level?
      </p>
      <div className="space-y-3">
        {levels.map((item) => (
          <button
            key={item.level}
            type="button"
            onClick={() => setFormData({ ...formData, fitnessLevel: item.level })}
            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
              formData.fitnessLevel === item.level
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="font-medium">{item.level}</div>
            <div className="text-sm text-gray-600">{item.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function WorkoutPreferences({ formData, setFormData }: any) {
  const frequencies = [
    '1-2 times per week',
    '3-4 times per week',
    '5-6 times per week',
    'Daily'
  ];

  const workoutTypes = [
    'Cardio',
    'Strength Training',
    'Yoga',
    'Pilates',
    'HIIT',
    'Swimming',
    'Running',
    'Cycling'
  ];

  const toggleWorkout = (workout: string) => {
    const newWorkouts = formData.preferredWorkouts.includes(workout)
      ? formData.preferredWorkouts.filter((w: string) => w !== workout)
      : [...formData.preferredWorkouts, workout];
    setFormData({ ...formData, preferredWorkouts: newWorkouts });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          How often do you want to work out?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {frequencies.map((frequency) => (
            <button
              key={frequency}
              type="button"
              onClick={() => setFormData({ ...formData, workoutFrequency: frequency })}
              className={`p-3 rounded-xl border-2 transition-all ${
                formData.workoutFrequency === frequency
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {frequency}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          What types of workouts interest you?
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {workoutTypes.map((workout) => (
            <button
              key={workout}
              type="button"
              onClick={() => toggleWorkout(workout)}
              className={`p-3 rounded-xl border-2 transition-all ${
                formData.preferredWorkouts.includes(workout)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {workout}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Onboarding;