import { Route } from "@/types";

export const userRoutes: Route[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/student",
      },
      {
        title: "My Bookings",
        url: "/student/bookings",
      },
      {
        title: "My Profile",
        url: "/student/profile",
      },
    ],
  },
  {
    title: "Browse",
    items: [
      {
        title: "Find Tutors",
        url: "/student/tutors",
      },
    ],
  },
];
