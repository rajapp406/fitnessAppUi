// Mock data for the LLM workout plan response
const workoutPlanMock = {
      "date": "2023-10-08",
      "day": "Day 1 of Week 1",
      "workout_type": "Strength Training",
      "focus_area": "Upper Body",
      "exercises": [
        {
          "name": "Bench Press",
          "sets": 4,
          "reps": "8-10",
          "rest": "90s",
          "equipment": "Barbell"
        },
        {
          "name": "Pull-Ups",
          "sets": 3,
          "reps": "As many as possible",
          "rest": "60s",
          "equipment": "Bodyweight"
        },
        {
          "name": "Incline Dumbbell Press",
          "sets": 3,
          "reps": "10-12",
          "rest": "60s",
          "equipment": "Dumbbells"
        },
        {
          "name": "Seated Cable Row",
          "sets": 3,
          "reps": "12-15",
          "rest": "60s",
          "equipment": "Cable Machine"
        }
      ],
      "warm_up": [
        {
          "name": "Dynamic Chest Stretch",
          "duration": "5 minutes"
        },
        {
          "name": "Light Cardio (Treadmill or Cycling)",
          "duration": "10 minutes"
        }
      ],
      "cool_down": [
        {
          "name": "Static Stretching",
          "duration": "10 minutes"
        },
        {
          "name": "Foam Rolling",
          "duration": "5 minutes"
        }
      ],
      "duration": "60 minutes",
      "intensity": "Moderate to High",
      "notes": "Focus on progressive overload. Increase weight slightly if current weight feels manageable."
    }
export default workoutPlanMock;
