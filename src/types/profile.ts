// User Profile
export interface Profile {
  id: string;
  name: string;
  email: string;

  created_at: string;

  daily_steps_target: number;

  onboarding_complete: boolean;

  goal?: string;

  target_weight_kg?: number;

  pace_kg_week?: number;

  daily_calorie_target?: number;

  daily_protein_target?: number;

  daily_carbs_target?: number;

  daily_fat_target?: number;
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