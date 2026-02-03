import { Route } from "@/types";

export const userRoutes: Route[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/dashboard",
      },
      {
        title: "My Bookings",
        url: "/dashboard/bookings",
      },
      {
        title: "My Profile",
        url: "/dashboard/profile",
      },
    ],
  },
  {
    title: "Browse",
    items: [
      {
        title: "Find Tutors",
        url: "/tutors",
      },
    ],
  },
];
