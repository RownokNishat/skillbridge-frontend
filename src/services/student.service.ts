const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api`;

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const studentService = {
  getMyProfile: async (
    options?: RequestInit,
  ): Promise<{ data: any | null; error: any }> => {
    try {
      const res = await fetch(`${API_URL}/student/profile`, {
        credentials: "include",
        cache: "no-store",
        ...options,
      });
      const data = await res.json();
      if (!res.ok) {
        return {
          data: null,
          error: { message: data.message || "Failed to fetch profile" },
        };
      }
      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch profile" } };
    }
  },

  updateProfile: async (
    profileData: {
      name?: string;
      phone?: string;
      image?: string;
      bio?: string;
    },
    options?: RequestInit,
  ): Promise<{ data: any | null; error: any }> => {
    try {
      const res = await fetch(`${API_URL}/student/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(profileData),
        ...options,
      });
      const data = await res.json();
      if (!res.ok) {
        return {
          data: null,
          error: { message: data.message || "Failed to update profile" },
        };
      }
      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to update profile" } };
    }
  },

  getMyBookings: async (
    filters?: { status?: string; sortBy?: string; order?: string },
    options?: RequestInit,
  ): Promise<{ data: any | null; error: any }> => {
    try {
      const params = new URLSearchParams();
      if (filters?.status) params.append("status", filters.status);
      if (filters?.sortBy) params.append("sortBy", filters.sortBy);
      if (filters?.order) params.append("order", filters.order);

      const queryString = params.toString();
      const url = `${API_URL}/bookings${queryString ? `?${queryString}` : ""}`;

      const res = await fetch(url, {
        credentials: "include",
        cache: "no-store",
        ...options,
      });
      const data = await res.json();
      if (!res.ok) {
        return {
          data: null,
          error: { message: data.message || "Failed to fetch bookings" },
        };
      }
      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch bookings" } };
    }
  },

  createBooking: async (
    bookingData: {
      tutorId: string;
      startTime: string;
      endTime: string;
    },
    options?: RequestInit,
  ): Promise<{ data: any | null; error: any }> => {
    try {
      const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(bookingData),
        ...options,
      });
      const data = await res.json();
      if (!res.ok) {
        return {
          data: null,
          error: { message: data.message || "Failed to create booking" },
        };
      }
      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to create booking" } };
    }
  },

  getBookingById: async (
    bookingId: string,
    options?: RequestInit,
  ): Promise<{ data: any | null; error: any }> => {
    try {
      const res = await fetch(`${API_URL}/bookings/${bookingId}`, {
        credentials: "include",
        cache: "no-store",
        ...options,
      });
      const data = await res.json();
      if (!res.ok) {
        return {
          data: null,
          error: { message: data.message || "Failed to fetch booking" },
        };
      }
      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch booking" } };
    }
  },

  // Cancel a booking
  cancelBooking: async (
    bookingId: string,
    options?: RequestInit,
  ): Promise<{ data: any | null; error: any }> => {
    try {
      const res = await fetch(`${API_URL}/bookings/${bookingId}/cancel`, {
        method: "PATCH",
        credentials: "include",
        ...options,
      });
      const data = await res.json();
      if (!res.ok) {
        return {
          data: null,
          error: { message: data.message || "Failed to cancel booking" },
        };
      }
      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to cancel booking" } };
    }
  },

  // Create a review for a tutor
  createReview: async (
    reviewData: {
      tutorId: string;
      rating: number;
      comment: string;
    },
    options?: RequestInit,
  ): Promise<{ data: any | null; error: any }> => {
    try {
      const res = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewData),
        ...options,
      });
      const data = await res.json();
      if (!res.ok) {
        return {
          data: null,
          error: { message: data.message || "Failed to create review" },
        };
      }
      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to create review" } };
    }
  },
};
