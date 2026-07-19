import { FoodItem } from "../types/food";

export function calculateTotals(items: FoodItem[]) {

    return items.reduce(

        (acc, item) => ({

            calories: acc.calories + item.calories,

            protein: acc.protein + item.protein_g,

            carbs: acc.carbs + item.carbs_g,

            fat: acc.fat + item.fat_g,

            amount: acc.amount + item.quantity,

        }),

        {

            calories: 0,

            protein: 0,

            carbs: 0,

            fat: 0,

            amount: 0,

        }

    );

}

export function calculateHealthScore(items: FoodItem[]) {

    const totals = calculateTotals(items);

    if (!totals.calories) return 0;

    const proteinRatio = (totals.protein * 4) / totals.calories;

    const carbRatio = (totals.carbs * 4) / totals.calories;

    const fatRatio = (totals.fat * 9) / totals.calories;

    let score = 5;

    if (proteinRatio >= 0.20)

        score += 2;

    else if (proteinRatio >= 0.12)

        score++;

    if (carbRatio >= 0.40 && carbRatio <= 0.60)

        score++;

    if (fatRatio <= 0.35)

        score++;

    else if (fatRatio > 0.50)

        score--;

    if (totals.calories < 800)

        score++;

    return Math.max(

        1,

        Math.min(10, score)

    );

}