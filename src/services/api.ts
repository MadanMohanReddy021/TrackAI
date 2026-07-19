export const generatePlan = async (payload: any) => {
  const response = await fetch("http://172.11.204.4:3000/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();

  console.log("Status:", response.status);
  console.log("Response:", text);

  return JSON.parse(text);
};