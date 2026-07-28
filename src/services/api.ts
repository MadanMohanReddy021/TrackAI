import BASE_URL from "@/storage/ipAdress";

export const generatePlan = async (payload: any) => {
  try {
    const response = await fetch(`${BASE_URL}/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();

    console.log("Status:", response.status);
    console.log("Response:", text);

    if (!response.ok) {
      throw new Error(text || "Request failed");
    }

    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("Generate Plan Error:", error);
    throw error;
  }
};