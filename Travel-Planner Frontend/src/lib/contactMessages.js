const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080').replace(/\/$/, '');

const parseJsonSafe = async (response) => {
  try {
    return await response.json();
  } catch (_error) {
    return null;
  }
};

const normalizeContactMessages = (payload) => (Array.isArray(payload) ? payload : []);

export const submitContactMessage = async ({ fullName, email, subject, message }) => {
  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fullName,
      email,
      subject,
      message,
    }),
  });

  const payload = await parseJsonSafe(response);
  if (!response.ok) {
    throw new Error(payload?.message || 'Unable to submit your message right now.');
  }

  return payload;
};

export const getAdminContactMessages = async (token) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/contact-messages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const payload = await parseJsonSafe(response);
  if (!response.ok) {
    throw new Error(payload?.message || 'Unable to load contact messages.');
  }

  return normalizeContactMessages(payload);
};

export const markAdminContactMessageRead = async (token, messageId) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/contact-messages/${messageId}/read`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const payload = await parseJsonSafe(response);
  if (!response.ok) {
    throw new Error(payload?.message || 'Unable to mark contact message as read.');
  }

  return payload;
};

export const markAllAdminContactMessagesRead = async (token) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/contact-messages/read-all`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const payload = await parseJsonSafe(response);
  if (!response.ok) {
    throw new Error(payload?.message || 'Unable to mark all contact messages as read.');
  }

  return normalizeContactMessages(payload);
};

export const deleteAdminContactMessage = async (token, messageId) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/contact-messages/${messageId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const payload = await parseJsonSafe(response);
  if (!response.ok) {
    throw new Error(payload?.message || 'Unable to delete contact message.');
  }
};
