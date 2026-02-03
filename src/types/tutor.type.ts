export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TutorProfile {
  id: string;
  userId: string;
  bio: string;
  expertise: string[];
  hourlyRate: number;
  experience: number;
  education: string;
  languages: string[];
  availability: AvailabilitySlot[];
  categoryId: string;
  category?: Category;
  averageRating: number;
  totalReviews: number;
  totalSessions: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  user?: User;
  reviews?: Review[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: "student" | "tutor" | "admin";
  createdAt: string;
  updatedAt: string;
}

export interface AvailabilitySlot {
  id: string;
  tutorProfileId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  studentId: string;
  tutorId: string;
  tutorProfileId: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  status: "confirmed" | "completed" | "cancelled";
  totalAmount: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  student?: User;
  tutor?: User;
  tutorProfile?: TutorProfile;
}

export interface Review {
  id: string;
  bookingId: string;
  studentId: string;
  tutorProfileId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  student?: User;
  booking?: Booking;
}

export interface TutorFilters {
  categoryId?: string;
  minRate?: number;
  maxRate?: number;
  minRating?: number;
  search?: string;
  sortBy?: "rating" | "price" | "experience";
  sortOrder?: "asc" | "desc";
}
