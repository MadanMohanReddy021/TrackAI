export interface FoodItem {
    name: string;

    quantity: number;

    serving: string;

    calories: number;

    protein_g: number;

    carbs_g: number;

    fat_g: number;
}

export interface ScanResponse {
    items: FoodItem[];
}

export interface SaveFoodRequest {
    meal: string;

    imageUrl?: string;

    items: FoodItem[];
}