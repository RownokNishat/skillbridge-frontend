import { env } from "@/env";
import { Category, TutorProfile, TutorFilters } from "@/types";

const API_URL = "http://localhost:5000/api";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export const tutorService = {
  // Get all tutors with filters
  getTutors: async (
    filters?: TutorFilters,
    options?: RequestInit,
  ): Promise<{
    data: ApiResponse<PaginatedResponse<TutorProfile>> | null;
    error: any;
  }> => {
    try {
      const params = new URLSearchParams();
      if (filters?.categoryId) params.append("categoryId", filters.categoryId);
      if (filters?.minRate)
        params.append("minRate", filters.minRate.toString());
      if (filters?.maxRate)
        params.append("maxRate", filters.maxRate.toString());
      if (filters?.minRating)
        params.append("minRating", filters.minRating.toString());
      if (filters?.search) params.append("search", filters.search);
      if (filters?.sortBy) params.append("sortBy", filters.sortBy);
      if (filters?.sortOrder) params.append("sortOrder", filters.sortOrder);

      const queryString = params.toString();
      const url = `${API_URL}/tutors${queryString ? `?${queryString}` : ""}`;

      const res = await fetch(url, options);
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch tutors" } };
    }
  },

  // Get single tutor by ID
  getTutorById: async (
    id: string,
    options?: RequestInit,
  ): Promise<{ data: ApiResponse<TutorProfile> | null; error: any }> => {
    try {
      const res = await fetch(`${API_URL}/tutors/${id}`, options);
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch tutor" } };
    }
  },

  // Get featured tutors
  getFeaturedTutors: async (
    options?: RequestInit,
  ): Promise<{ data: ApiResponse<TutorProfile[]> | null; error: any }> => {
    try {
      const res = await fetch(
        `${API_URL}/tutors?featured=true&limit=6`,
        options,
      );
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to fetch featured tutors" },
      };
    }
  },

  // Get all categories
  getCategories: async (
    options?: RequestInit,
  ): Promise<{ data: ApiResponse<Category[]> | null; error: any }> => {
    try {
      const res = await fetch(`${API_URL}/categories`, options);
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch categories" } };
    }
  },

  // Update tutor profile (for tutors)
  updateTutorProfile: async (
    data: Partial<TutorProfile>,
    options?: RequestInit,
  ): Promise<{ data: ApiResponse<TutorProfile> | null; error: any }> => {
    try {
      const res = await fetch(`${API_URL}/tutor/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
        ...options,
      });
      const responseData = await res.json();
      return { data: responseData, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to update profile" } };
    }
  },

  // Alias for updateTutorProfile
  updateProfile: async (
    data: Partial<TutorProfile>,
    options?: RequestInit,
  ): Promise<{ data: ApiResponse<TutorProfile> | null; error: any }> => {
    return tutorService.updateTutorProfile(data, options);
  },

  // Update tutor availability
  updateAvailability: async (
    availability: Record<string, string[]>,
    options?: RequestInit,
  ): Promise<{ data: ApiResponse<any> | null; error: any }> => {
    try {
      const res = await fetch(`${API_URL}/tutor/availability`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ availability }),
        ...options,
      });
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to update availability" },
      };
    }
  },

  // Get tutor's own profile
  getMyProfile: async (
    options?: RequestInit,
  ): Promise<{ data: any | null; error: any }> => {
    try {
      const res = await fetch(`${API_URL}/tutor/profile`, {
        credentials: "include",
        cache: "no-store",
        ...options,
      });
      const data = await res.json();
      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch profile" } };
    }
  },

  // Get tutor's sessions/bookings
  getMySessions: async (
    status?: string,
    options?: RequestInit,
  ): Promise<{ data: any | null; error: any }> => {
    try {
      const url = status
        ? `${API_URL}/tutor/sessions?status=${status}`
        : `${API_URL}/tutor/sessions`;

      const res = await fetch(url, {
        credentials: "include",
        cache: "no-store",
        ...options,
      });
      const data = await res.json();
      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch sessions" } };
    }
  },

  // Mark session as complete
  markSessionComplete: async (
    bookingId: number,
  ): Promise<{ data: any | null; error: any }> => {
    try {
      const res = await fetch(
        `${API_URL}/tutor/sessions/${bookingId}/complete`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      const data = await res.json();
      return { data: data.data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to mark session as complete" },
      };
    }
  },

  // Get dashboard statistics
  getDashboardStats: async (
    options?: RequestInit,
  ): Promise<{ data: any | null; error: any }> => {
    try {
      const res = await fetch(`${API_URL}/tutor/dashboard`, {
        credentials: "include",
        cache: "no-store",
        ...options,
      });
      const data = await res.json();
      return { data: data.data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to fetch dashboard stats" },
      };
    }
  },
};
