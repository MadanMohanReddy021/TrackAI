// src/constants/onboarding.ts

export type Goal =
  | "weight_loss"
  | "weight_gain"
  | "muscle_gain"
  | "strength";

export type Gender =
  | "male"
  | "female"
  | "other";

export type Activity =
  | "sedentary"
  | "light"
  | "moderate"
  | "very_active"
  | "athlete";

export interface PaceOption {
  value: number;
  title: string;
  description: string;
}

export const PACE_OPTIONS: Record<Goal, PaceOption[]> = {
  loss: [
    {
      value: 0.25,
      title: "Mild Loss",
      description: "−250 kcal/day • ~0.25 kg/week",
    },
    {
      value: 0.5,
      title: "Moderate Loss",
      description: "−500 kcal/day • ~0.5 kg/week",
    },
  ],

  gain: [
    {
      value: 0.25,
      title: "Slow Gain",
      description: "+250 kcal/day • ~0.25 kg/week",
    },
    {
      value: 0.5,
      title: "Moderate Gain",
      description: "+500 kcal/day • ~0.5 kg/week",
    },
  ],

  muscle_gain: [
    {
      value: 0.25,
      title: "Lean Bulk",
      description: "+250 kcal/day • ~0.25 kg/week",
    },
    {
      value: 0.5,
      title: "Moderate Bulk",
      description: "+500 kcal/day • ~0.5 kg/week",
    },
  ],

  maintain: [
    {
      value: 0,
      title: "Maintenance",
      description: "Maintain current weight",
    },
  ],
};

export const GOALS = [
  {
    value: "loss" as Goal,
    title: "Weight Loss",
    description: "Sustainable fat loss with a calorie deficit.",
  },
   {
    value: "maintain" as Goal,
    title: "Maintenance",
    description: "Maintain current weight.",
  },
  {
    value: "gain" as Goal,
    title: " Weight Gain",
    description: "Healthy calorie surplus for weight gain.",
  },
 
  
];

export const ACTIVITY_LEVELS = [
  {
    value: "sedentary" as Activity,
    title: "Sedentary",
    description: "Little or no exercise • Desk job (×1.20)",
  },
  {
    value: "lightly_active" as Activity,
    title: "Lightly Active",
    description: "Exercise 1–3 days/week (×1.375)",
  },
  {
    value: "moderately_active" as Activity,
    title: "Moderately Active",
    description: "Exercise 3–5 days/week (×1.55)",
  },
  {
    value: "very_active" as Activity,
    title: "Very Active",
    description: "Exercise 6–7 days/week (×1.725)",
  },
  {
    value: "athlete" as Activity,
    title: "Athlete",
    description: "Twice daily training / Physical job (×1.90)",
  },
];

export const COLORS = {
  background: "#FAF7F1",
  white: "#FFFFFF",
  text: "#1A1A1A",
  muted: "#8A8579",
  border: "#ECE6D8",
  gold: "#C9A24B",
  goldDark: "#A8842F",
};