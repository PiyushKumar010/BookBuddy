import { create } from "zustand";
import { useAuthStore } from "./auth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useBookStore = create((set, get) => ({
  books: [],
  setBooks: (books) => set({ books }),
  createBook: async (newBook) => {
    const { user } = useAuthStore.getState();
    if (!user) {
      return { success: false, message: "You must be logged in to add a book." };
    }
    if (
      !newBook.title ||
      !newBook.description ||
      !newBook.image ||
      !newBook.nameAuthor ||
      newBook.price === undefined ||
      newBook.price === ""
    ) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch(`${BACKEND_URL}/api/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      return { success: false, message: data.message || "Failed to create book" };
    }
    set((state) => ({ books: [...state.books, data.data] }));
    return { success: true, message: "Book created successfully" };
  },
  fetchBooks: async () => {
    const res = await fetch(`${BACKEND_URL}/api/books`, { credentials: "include" });
    if (!res.ok) {
      set({ books: [] });
      return;
    }
    const data = await res.json();
    set({ books: data.data });
  },
  deleteBook: async (bid) => {
    const { user } = useAuthStore.getState();
    if (!user) {
      return { success: false, message: "You must be logged in to delete a book." };
    }
    const res = await fetch(`${BACKEND_URL}/api/books/${bid}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    set((state) => ({
      books: state.books.filter((book) => book._id !== bid),
    }));
    return { success: true, message: data.message };
  },
  updateBook: async (bid, updatedBook) => {
    const { user } = useAuthStore.getState();
    if (!user) {
      return { success: false, message: "You must be logged in to update a book." };
    }
    const res = await fetch(`${BACKEND_URL}/api/books/${bid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
      credentials: "include",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    set((state) => ({
      books: state.books.map((book) => (book._id === bid ? data.data : book)),
    }));
    return { success: true, message: data.message };
  },
  clearBooks: () => set({ books: [] }),
}));
