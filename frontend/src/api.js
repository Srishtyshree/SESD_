const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5005/api';

export async function fetchBooks() {
  try {
    const res = await fetch(`${API_BASE}/books`);
    return await res.json();
  } catch (err) {
    throw new Error('Archive backend is unreachable. Please ensure the server is running on port 5005.');
  }
}

export async function fetchBookById(id) {
  try {
    const res = await fetch(`${API_BASE}/books/${id}`);
    if (!res.ok) throw new Error('Volume not found in the Archive.');
    return await res.json();
  } catch (err) {
    throw new Error('Archive backend is unreachable or volume missing.');
  }
}

export async function login(email, password) {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'The Archive does not recognize these credentials.');
    }
    return await res.json();
  } catch (err) {
    if (err.message.includes('credentials')) throw err;
    throw new Error('Archive server is offline. Please start the backend to sign in.');
  }
}

export async function signup(username, email, password) {
  try {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Archival registration failed.');
    }
    return await res.json();
  } catch (err) {
    if (err.message.includes('registration')) throw err;
    throw new Error('Archive server is offline. Please start the backend to join the fellowship.');
  }
}

export async function fetchMe() {
  const token = localStorage.getItem('luminary_token');
  if (!token) return null;
  const res = await fetch(`${API_BASE}/user/me`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) return null;
  return res.json();
}

export async function saveBook(bookId) {
  const token = localStorage.getItem('luminary_token');
  const res = await fetch(`${API_BASE}/user/save/${bookId}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}

export async function unsaveBook(bookId) {
  const token = localStorage.getItem('luminary_token');
  const res = await fetch(`${API_BASE}/user/unsave/${bookId}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}

export async function fetchAdminStats() {
  const token = localStorage.getItem('luminary_token');
  const res = await fetch(`${API_BASE}/admin/stats`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Unassigned access');
  return res.json();
}

export async function fetchAdminUsers() {
  const token = localStorage.getItem('luminary_token');
  const res = await fetch(`${API_BASE}/admin/users`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Unassigned access');
  return res.json();
}
