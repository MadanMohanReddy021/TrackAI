import {
    MAX_SCORE,
    MIN_SCORE,
    STARTING_SCORE,
} from "../constants/healthScore";

import { DayMetrics } from "../types/profile";

export type HealthStatus = {
  label: string;
  tone: "danger" | "warn" | "good" | "excellent";
};

export const clamp = (
  value: number,
  min: number = MIN_SCORE,
  max: number = MAX_SCORE
) => {
  return Math.max(min, Math.min(max, value));
};

export const statusFor = (score: number): HealthStatus => {
  if (score < 500) {
    return {
      label: "Poor",
      tone: "danger",
    };
  }

  if (score < 700) {
    return {
      label: "Fair",
      tone: "warn",
    };
  }

  if (score < 850) {
    return {
      label: "Good",
      tone: "good",
    };
  }

  return {
    label: "Excellent",
    tone: "excellent",
  };
};

export const replayScore = (
  startingScore: number = STARTING_SCORE,
  days: DayMetrics[]
) => {
  let score = startingScore;

  days.forEach((day) => {
    const stepRatio = Math.min(
      day.steps / day.stepsGoal,
      1
    );

    // Daily Steps (70%)
    score += (stepRatio - 0.5) * 8;

    // Food Logging (10%)
    if (day.hasFoodLog) {
      score += 1;
    } else {
      score -= 1;
    }

    // Consistency (20%)
    if (day.hasAppActivity) {
      score += 2;
    } else {
      score -= 2;
    }
  });

  return Math.round(clamp(score));
};

export const componentBreakdown = (
  days: DayMetrics[]
) => {
  const total = days.length;

  if (total === 0) {
    return {
      steps: 0,
      food: 0,
      consistency: 0,
    };
  }

  const avgStepProgress =
    days.reduce(
      (sum, day) =>
        sum +
        Math.min(day.steps / day.stepsGoal, 1),
      0
    ) / total;

  const foodDays =
    days.filter((d) => d.hasFoodLog).length;

  const activeDays =
    days.filter((d) => d.hasAppActivity).length;

  return {
    steps: Math.round(avgStepProgress * 100),
    food: Math.round((foodDays / total) * 100),
    consistency: Math.round(
      (activeDays / total) * 100
    ),
  };
};

export const calculateAverageSteps = (
  days: DayMetrics[]
) => {
  if (days.length === 0) {
    return 0;
  }

  const totalSteps = days.reduce(
    (sum, day) => sum + day.steps,
    0
  );

  return Math.round(totalSteps / days.length);
};

export const calculateConsistency = (
  days: DayMetrics[]
) => {
  if (days.length === 0) {
    return 0;
  }

  const activeDays =
    days.filter((d) => d.hasAppActivity).length;

  return Math.round(
    (activeDays / days.length) * 100
  );
};

export const calculateGoalsMet = (
  days: DayMetrics[]
) => {
  if (days.length === 0) {
    return 0;
  }

  const met =
    days.filter(
      (d) => d.steps >= d.stepsGoal
    ).length;

  return Math.round(
    (met / days.length) * 100
  );
};

export const calculateCurrentStreak = (
  days: DayMetrics[]
) => {
  let streak = 0;

  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].hasAppActivity) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

export const calculateLongestStreak = (
  days: DayMetrics[]
) => {
  let current = 0;
  let longest = 0;

  days.forEach((day) => {
    if (day.hasAppActivity) {
      current++;

      if (current > longest) {
        longest = current;
      }
    } else {
      current = 0;
    }
  });

  return longest;
};

export const calculateBestDay = (
  days: DayMetrics[]
) => {
  if (days.length === 0) {
    return 0;
  }

  return Math.max(
    ...days.map((d) => d.steps)
  );
};

export const calculateTotalSteps = (
  days: DayMetrics[]
) => {
  return days.reduce(
    (sum, day) => sum + day.steps,
    0
  );
};