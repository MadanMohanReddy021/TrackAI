import BASE_URL from "@/storage/ipAdress";
const API = BASE_URL;

export async function sendTranscript(text: string) {
  const response = await fetch(`${API}/voice-log`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();
}