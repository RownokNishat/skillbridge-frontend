import { proxy } from "@/proxy";
import { Category, TutorProfile, TutorFilters } from "@/types";

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
    options?: RequestInit
  ): Promise<ApiResponse<PaginatedResponse<TutorProfile>>> => {
    const params = new URLSearchParams();
    if (filters?.categoryId) params.append("categoryId", filters.categoryId);
    if (filters?.minRate) params.append("minRate", filters.minRate.toString());
    if (filters?.maxRate) params.append("maxRate", filters.maxRate.toString());
    if (filters?.minRating)
      params.append("minRating", filters.minRating.toString());
    if (filters?.search) params.append("search", filters.search);
    if (filters?.sortBy) params.append("sortBy", filters.sortBy);
    if (filters?.sortOrder) params.append("sortOrder", filters.sortOrder);

    const queryString = params.toString();
    const url = `/api/tutors${queryString ? `?${queryString}` : ""}`;

    return proxy(url, options);
  },

  // Get single tutor by ID
  getTutorById: async (
    id: string,
    options?: RequestInit
  ): Promise<ApiResponse<TutorProfile>> => {
    return proxy(`/api/tutors/${id}`, options);
  },

  // Get featured tutors
  getFeaturedTutors: async (
    options?: RequestInit
  ): Promise<ApiResponse<TutorProfile[]>> => {
    return proxy("/api/tutors?featured=true&limit=6", options);
  },

  // Get all categories
  getCategories: async (
    options?: RequestInit
  ): Promise<ApiResponse<Category[]>> => {
    return proxy("/api/categories", options);
  },

  // Update tutor profile (for tutors)
  updateTutorProfile: async (
    data: Partial<TutorProfile>,
    options?: RequestInit
  ): Promise<ApiResponse<TutorProfile>> => {
    return proxy("/api/tutor/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      ...options,
    });
  },

  // Update tutor availability
  updateAvailability: async (
    availability: any[],
    options?: RequestInit
  ): Promise<ApiResponse<any>> => {
    return proxy("/api/tutor/availability", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ availability }),
      ...options,
    });
  },
};
