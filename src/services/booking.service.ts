import { proxy } from "@/proxy";
import { Booking } from "@/types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface CreateBookingData {
  tutorProfileId: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  notes?: string;
}

export const bookingService = {
  // Create a new booking
  createBooking: async (
    data: CreateBookingData,
    options?: RequestInit
  ): Promise<ApiResponse<Booking>> => {
    return proxy("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      ...options,
    });
  },

  // Get user's bookings
  getMyBookings: async (
    options?: RequestInit
  ): Promise<ApiResponse<Booking[]>> => {
    return proxy("/api/bookings", options);
  },

  // Get booking by ID
  getBookingById: async (
    id: string,
    options?: RequestInit
  ): Promise<ApiResponse<Booking>> => {
    return proxy(`/api/bookings/${id}`, options);
  },

  // Cancel booking
  cancelBooking: async (
    id: string,
    options?: RequestInit
  ): Promise<ApiResponse<Booking>> => {
    return proxy(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "cancelled" }),
      ...options,
    });
  },

  // Mark booking as completed (for tutors)
  completeBooking: async (
    id: string,
    options?: RequestInit
  ): Promise<ApiResponse<Booking>> => {
    return proxy(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "completed" }),
      ...options,
    });
  },
};
