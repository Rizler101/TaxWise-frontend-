export const API_BASE = "http://localhost:8000"; // your backend URL

export async function uploadCSV(file) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: form,
  });
  return res.json();
}
