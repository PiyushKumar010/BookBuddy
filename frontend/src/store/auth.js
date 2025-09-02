import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  setUser: (user) => {
    set({ user });
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  },
  login: async (email, password) => {
    const res = await fetch("/api/users/login", {
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
    const res = await fetch("/api/users/register", {
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
    // Clear books on logout
    try {
      const { clearBooks } = require("./book");
      if (clearBooks) clearBooks();
    } catch (e) {}
  },
}));
