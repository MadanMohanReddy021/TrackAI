// User Profile
export interface Profile {
  userid: string;
  full_name: string;

  gender: string;
  age: number;

  height_cm: string;
  current_weight_kg: string;
  target_weight_kg: string;

  activity_level: string;

  goal: string;
  goal_type: string;

  bmr: string;
  maintenance_calories: string;
  target_calories: string;

  expected_weekly_change: string;

  target_date?: string | null;
  referral_source?: string | null;

  protein: string;
  fat: string;
  carbs: string;
  water_ml: string;

  created_at: string;
  updated_at: string;
}

// Daily Step Log
export interface StepLog {
  log_date: string; // Format: YYYY-MM-DD
  steps: number;
  goal: number;
}

// Food Log
export interface FoodLog {
  logged_at: string; // ISO Date String
}

// Health Score History
export interface HealthScoreHistory {
  score: number;

  log_date: string;

  steps_component: number;

  consistency_component: number;

  food_component: number;
}

// Used by the Health Score Calculator
export interface DayMetrics {
  steps: number;
  stepsGoal: number;

  hasFoodLog: boolean;

  hasAppActivity: boolean;
}