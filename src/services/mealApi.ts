import apis from "./apis";

export async function saveMeal(data: any) {
  const response = await apis.post("/meals", data);

  return response.data;
}
