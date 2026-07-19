import api from "./api";

export async function saveMeal(data: any) {

  const response = await api.post(
    "/meals",
    data
  );

  return response.data;

}