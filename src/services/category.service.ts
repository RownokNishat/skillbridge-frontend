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

  /**
   * Create a new category (admin only)
   */
  createCategory: async function (name: string, description: string) {
    try {
      const res = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, description }),
      });

      if (!res.ok) {
        throw new Error("Failed to create category");
      }

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to create category" } };
    }
  },

  /**
   * Update an existing category (admin only)
   */
  updateCategory: async function (
    categoryId: string,
    name: string,
    description: string,
  ) {
    try {
      const res = await fetch(`${API_URL}/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, description }),
      });

      if (!res.ok) {
        throw new Error("Failed to update category");
      }

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to update category" } };
    }
  },

  /**
   * Delete a category (admin only)
   */
  deleteCategory: async function (categoryId: string) {
    try {
      const res = await fetch(`${API_URL}/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to delete category");
      }

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to delete category" } };
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
