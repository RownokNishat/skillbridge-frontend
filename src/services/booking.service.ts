import { env } from "@/env";
import { Booking } from "@/types";

const API_URL = env.API_URL;

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
  ): Promise<{ data: ApiResponse<Booking> | null; error: any }> => {
    try {
      const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        ...options,
      });
      const responseData = await res.json();
      return { data: responseData, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to create booking" } };
    }
  },

  // Get user's bookings
  getMyBookings: async (
    options?: RequestInit
  ): Promise<{ data: ApiResponse<Booking[]> | null; error: any }> => {
    try {
      const res = await fetch(`${API_URL}/bookings`, options);
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch bookings" } };
    }
  },

  // Get booking by ID
  getBookingById: async (
    id: string,
    options?: RequestInit
  ): Promise<{ data: ApiResponse<Booking> | null; error: any }> => {
    try {
      const res = await fetch(`${API_URL}/bookings/${id}`, options);
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch booking" } };
    }
  },

  // Cancel booking
  cancelBooking: async (
    id: string,
    options?: RequestInit
  ): Promise<{ data: ApiResponse<Booking> | null; error: any }> => {
    try {
      const res = await fetch(`${API_URL}/bookings/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "cancelled" }),
        ...options,
      });
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to cancel booking" } };
    }
  },

  // Mark booking as completed (for tutors)
  completeBooking: async (
    id: string,
    options?: RequestInit
  ): Promise<{ data: ApiResponse<Booking> | null; error: any }> => {
    try {
      const res = await fetch(`${API_URL}/bookings/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "completed" }),
        ...options,
      });
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to complete booking" } };
    }
  },
};
