const API_URL = 'http://localhost:4000/api/beds';

export async function getBeds() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function addBed(name) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ name })
  });
  return res.json();
}

export async function updateBed(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  return res.json();
}
