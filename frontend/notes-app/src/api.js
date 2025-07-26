// Vite exposes env variables on import.meta.env, not process.env
export const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

export async function login(username, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  return res.json();
}

export async function register(username, password) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  return res.json();
}

export async function fetchNotes(token) {
  const res = await fetch(`${API_URL}/notes`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

export async function createNote(token, note) {
  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(note)
  });
  return res.json();
}

export async function updateNote(token, id, note) {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(note)
  });
  return res.json();
}

export async function deleteNote(token, id) {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

export async function pinNote(token, id, isPinned) {
  const res = await fetch(`${API_URL}/notes/${id}/pin`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ isPinned })
  });
  return res.json();
}

export async function uploadFile(token, file) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_URL}/files/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
      // Do NOT set Content-Type, browser will set it for FormData
    },
    body: formData
  });
  return res.json();
}

// Fetch all files metadata
export async function fetchFiles(token) {
  const res = await fetch(`${API_URL}/files`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch files');
  }

  return await res.json();
}

export async function deleteFile(token, id) {
  const res = await fetch(`${API_URL}/files/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

