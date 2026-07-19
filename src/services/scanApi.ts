import { FoodItem } from "../types/food";
import apis from "./apis";

export async function uploadFoodImage(imageUri: string) {
    const formData = new FormData();
console.log("Uploading image");
    formData.append("image", {
        uri: imageUri,
        name: `food_${Date.now()}.jpg`,
        type: "image/jpeg",
    } as any);

    const { data } = await apis.post(
        "/food/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return data;
}

export async function scanFood(imageUrl: string) {

    const { data } = await apis.post(
        "/food/scan",
        {
            imageUrl,
        }
    );

    return data as {

        items: FoodItem[];

    };
}