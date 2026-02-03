import { env } from "@/env";

const API_URL = "http://localhost:5000/api";

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export const categoryService = {
  /**
   * Get all categories (public endpoint)
   */
  getAllCategories: async function (options?: ServiceOptions) {
    try {
      const config: RequestInit = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      const res = await fetch(`${API_URL}/categories`, config);

      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to load categories" } };
    }
  },

  /**
   * Get a single category by ID
   */
  getCategoryById: async function (categoryId: string) {
    try {
      const res = await fetch(`${API_URL}/categories/${categoryId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch category");
      }

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to load category" } };
    }
  },

  // Create
  createCategory: async (name: string, description: string) => {
    try {
      const res = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
        credentials: "include", // Important for Admin Auth
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create");
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },

  // Update
  updateCategory: async (id: string, name: string, description: string) => {
    try {
      const res = await fetch(`${API_URL}/categories/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update");
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },

  // Delete
  deleteCategory: async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/categories/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete");
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },

  /**
   * Get tutors by category (public endpoint)
   */
  getTutorsByCategory: async function (
    categoryId: string,
    options?: ServiceOptions,
  ) {
    try {
      const config: RequestInit = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      const res = await fetch(
        `${API_URL}/categories/${categoryId}/tutors`,
        config,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch tutors");
      }

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to load tutors" } };
    }
  },
};
