import { Route } from "@/types";

export const tutorRoutes: Route[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/tutor/dashboard",
      },
      {
        title: "My Sessions",
        url: "/tutor/sessions",
      },
      {
        title: "Availability",
        url: "/tutor/availability",
      },
      {
        title: "My Profile",
        url: "/tutor/profile",
      },
    ],
  },
];
