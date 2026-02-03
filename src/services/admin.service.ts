import { env } from "@/env";

const API_URL = "http://localhost:5000/api";

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export const adminService = {
  getAllUsers: async function (options?: ServiceOptions) {
    try {
      const config: RequestInit = {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      const res = await fetch(`${API_URL}/admin/users`, config);

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to load users" } };
    }
  },

  updateUserStatus: async (userId: string, status: string) => {
    try {
      const res = await fetch(`${API_URL}/admin/users/${userId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        credentials: "include", // Important for auth cookies
      });
      const data = await res.json();
      return { data, error: !res.ok ? data : null };
    } catch (err: any) {
      return { data: null, error: { message: "Failed to update status" } };
    }
  },

  getAllBookings: async function (options?: ServiceOptions) {
    try {
      const config: RequestInit = {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      const res = await fetch(`${API_URL}/bookings`, config);

      if (!res.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to load bookings" } };
    }
  },

  getAllCategories: async function (options?: ServiceOptions) {
    try {
      const config: RequestInit = {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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
};
