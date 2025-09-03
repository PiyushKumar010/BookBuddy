import { create } from "zustand";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  setUser: (user) => {
    set({ user });
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  },
  login: async (email, password) => {
    const res = await fetch(`${BACKEND_URL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    let data;
    try {
      data = await res.json();
    } catch (e) {
      const text = await res.text();
      return { success: false, message: text };
    }
    if (data.user) {
      set({ user: data.user });
      localStorage.setItem("user", JSON.stringify(data.user));
      return { success: true };
    }
    return { success: false, message: data.message };
  },
  register: async (name, email, password) => {
    const res = await fetch(`${BACKEND_URL}/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
      credentials: "include",
    });
    let data;
    try {
      data = await res.json();
    } catch (e) {
      const text = await res.text();
      return { success: false, message: text };
    }
    if (data.user) {
      set({ user: data.user });
      localStorage.setItem("user", JSON.stringify(data.user));
      return { success: true };
    }
    return { success: false, message: data.message };
  },
  logout: () => {
    set({ user: null });
    localStorage.removeItem("user");
    
    try {
      const { clearBooks } = require("./book");
      if (clearBooks) clearBooks();
    } catch (e) {}
  },
}));
