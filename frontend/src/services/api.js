const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5002/api";

async function request(endpoint, options = {}, getToken) {
  const headers = { "Content-Type": "application/json" };
  if (getToken) {
    const token = await getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: { ...headers, ...options.headers },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  getUser: (id, getToken) => request(`/users/${id}`, {}, getToken),
  getUserByUsername: (username, getToken) => request(`/users/by-username/${encodeURIComponent(username)}`, {}, getToken),
  getUserPosts: (username, getToken) => request(`/users/by-username/${encodeURIComponent(username)}/posts`, {}, getToken),
  getMe: (getToken) => request("/users/me", {}, getToken),
  syncUser: (data, getToken) => request("/users/sync", { method: "POST", body: JSON.stringify(data) }, getToken),
  updateUser: (data, getToken) => request("/users/me", { method: "PUT", body: JSON.stringify(data) }, getToken),
  searchUsers: (query, getToken) => request(`/users/search?q=${encodeURIComponent(query)}`, {}, getToken),
  getSuggestedUsers: (getToken) => request("/users/suggested", {}, getToken),

  getPosts: (getToken) => request("/posts", {}, getToken),
  getPost: (id, getToken) => request(`/posts/${id}`, {}, getToken),
  createPost: (data, getToken) => request("/posts", { method: "POST", body: JSON.stringify(data) }, getToken),
  deletePost: (id, getToken) => request(`/posts/${id}`, { method: "DELETE" }, getToken),
  searchPosts: (query, getToken) => request(`/posts/search?q=${encodeURIComponent(query)}`, {}, getToken),
  getTrending: () => request("/posts/trending"),

  addLike: (postId, getToken) => request("/likes", { method: "POST", body: JSON.stringify({ post_id: postId }) }, getToken),
  removeLike: (postId, getToken) => request("/likes", { method: "DELETE", body: JSON.stringify({ post_id: postId }) }, getToken),

  getComments: (postId, getToken) => request(`/posts/${postId}/comments`, {}, getToken),
  addComment: (data, getToken) => request("/comments", { method: "POST", body: JSON.stringify(data) }, getToken),
  deleteComment: (id, getToken) => request(`/comments/${id}`, { method: "DELETE" }, getToken),

  follow: (followedUserId, getToken) => request("/followers", { method: "POST", body: JSON.stringify({ followed_user_id: followedUserId }) }, getToken),
  unfollow: (id, getToken) => request(`/followers/${id}`, { method: "DELETE" }, getToken),

  getMessages: (getToken) => request("/messages", {}, getToken),
  getMessagesForUser: (userId, getToken) => request(`/messages/${userId}`, {}, getToken),
  sendMessage: (data, getToken) => request("/messages", { method: "POST", body: JSON.stringify(data) }, getToken),
};
