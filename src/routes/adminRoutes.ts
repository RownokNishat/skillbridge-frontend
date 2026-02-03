import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/admin",
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Users",
        url: "/admin/users",
      },
      {
        title: "Bookings",
        url: "/admin/bookings",
      },
      {
        title: "Categories",
        url: "/admin/categories",
      },
    ],
  },
];
