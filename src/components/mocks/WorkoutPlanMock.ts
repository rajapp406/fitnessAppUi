import { Award, Clock, Dumbbell, Flame } from "lucide-react";
import type { StatItem, Workout, WorkoutPlan } from '../../types';


// Mock data for the LLM workout plan response
const workoutPlanMock = {
  "user_id": "string",
  "fitness_level": "intermediate",
  "goal": "Muscle building",
  "day": 2,
  "workout": {
    "date": "2025-07-12",
    "day": "Day 2 of Week 1",
    "workout_type": "Strength Training",
    "focus_area": "Upper Body",
    "exercises": [
      {
        "name": "Bench Press",
        "hint": "Engage your chest and triceps; keep your back flat on the bench.",
        "sets": 4,
        "reps": "10-12",
        "rest": "90s",
        "equipment": "Barbell or Dumbbells",
        "youtube": "https://www.youtube.com/watch?v=SCVCLChPQFY"
      },
      {
        "name": "Pull-Ups",
        "hint": "Focus on controlled movements; avoid swinging.",
        "sets": 4,
        "reps": "8-10",
        "rest": "90s",
        "equipment": "Pull-Up Bar",
        "youtube": "https://www.youtube.com/watch?v=eGo4IYlbE5g"
      },
      {
        "name": "Shoulder Press",
        "hint": "Keep your core engaged and do not arch your lower back.",
        "sets": 3,
        "reps": "10-12",
        "rest": "60s",
        "equipment": "Dumbbells or Barbell",
        "youtube": "https://www.youtube.com/watch?v=B-aVuyhvLHU"
      },
      {
        "name": "Incline Dumbbell Press",
        "hint": "Use dumbbells and focus on upper chest engagement.",
        "sets": 3,
        "reps": "10-12",
        "rest": "60s",
        "equipment": "Dumbbells",
        "youtube": "https://www.youtube.com/watch?v=8iPEnn-ltC8"
      },
      {
        "name": "Bicep Curls",
        "hint": "Avoid swinging your arms; keep elbows stationary.",
        "sets": 3,
        "reps": "12-15",
        "rest": "60s",
        "equipment": "Dumbbells",
        "youtube": "https://www.youtube.com/watch?v=ykJmrZ5v0Oo"
      }
    ],
    "duration": "55 minutes",
    "warm_up": {
      "activities": [
        {
          "name": "Arm Circles",
          "description": "Perform forward and backward circles to loosen your shoulders.",
          "duration": "2 minutes",
          "youtube": "https://www.youtube.com/watch?v=UVMEnIaY8aU"
        },
        {
          "name": "Push-Ups",
          "description": "Perform 10 slow and controlled push-ups.",
          "reps": 10,
          "youtube": "https://www.youtube.com/watch?v=_l3ySVKYVJ8"
        },
        {
          "name": "Dynamic Chest Stretch",
          "description": "Perform a stretching routine for your chest.",
          "duration": "3 minutes",
          "youtube": "https://www.youtube.com/watch?v=xtkXIdnHfkk"
        }
      ],
      "total_duration": "7 minutes"
    },
    "cool_down": {
      "activities": [
        {
          "name": "Cross-Body Shoulder Stretch",
          "description": "Hold each arm for about 30 seconds.",
          "duration": "1 minute",
          "youtube": "https://www.youtube.com/watch?v=aIq0fLi8iak"
        },
        {
          "name": "Child's Pose",
          "description": "Stretch your back and shoulders.",
          "duration": "2 minutes",
          "youtube": "https://www.youtube.com/watch?v=1ygQrW_0MZY"
        },
        {
          "name": "Pec Stretch",
          "description": "Hold each side for 30 seconds.",
          "duration": "1 minute",
          "youtube": "https://www.youtube.com/watch?v=xtkXIdnHfkk"
        }
      ],
      "total_duration": "5 minutes"
    },
    "intensity": "Moderate to High",
    "notes": "Focus on proper technique to avoid injury and maximize muscle activation. Increase weights progressively with sets if you feel confident.",
    "today": "focused on foundational upper body strength to complement yesterday's lower body session.",
    "tomorrow": "will likely focus on active recovery or functional mobility to balance effort."
  },
  "youtube_status": "YouTube links processed successfully"
}
export default workoutPlanMock;

export const stats: StatItem[] = [
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
      icon: Flame,
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

  export const workouts: Workout[] = [
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