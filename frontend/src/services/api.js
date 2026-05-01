import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

export const getApiErrorMessage = (apiError, fallbackMessage) => {
  if (apiError?.response?.data?.message) {
    return apiError.response.data.message;
  }

  if (apiError?.code === "ERR_NETWORK") {
    return "Cannot connect to backend. Start backend on http://localhost:5000 and try again.";
  }

  return fallbackMessage;
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("libraryToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    return data;
  },
  login: async (payload) => {
    const { data } = await api.post("/auth/login", payload);
    return data;
  }
};

export const bookService = {
  getBooks: async (search = "") => {
    const { data } = await api.get("/books", { params: { search } });
    return data;
  },
  getBookById: async (id) => {
    const { data } = await api.get(`/books/${id}`);
    return data;
  },
  createBook: async (payload) => {
    const { data } = await api.post("/books", payload);
    return data;
  },
  updateBook: async (id, payload) => {
    const { data } = await api.put(`/books/${id}`, payload);
    return data;
  },
  deleteBook: async (id) => {
    const { data } = await api.delete(`/books/${id}`);
    return data;
  }
};

export const borrowService = {
  borrowBook: async (bookId) => {
    const { data } = await api.post("/borrow", { bookId });
    return data;
  },
  returnBook: async (recordId) => {
    const { data } = await api.put(`/borrow/return/${recordId}`);
    return data;
  },
  getUserRecords: async (userId) => {
    const url = userId ? `/borrow/user/${userId}` : "/borrow/user";
    const { data } = await api.get(url);
    return data;
  },
  getAllRecords: async () => {
    const { data } = await api.get("/borrow/all");
    return data;
  }
};

export default api;
