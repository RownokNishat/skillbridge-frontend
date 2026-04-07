# Project Update-1 Requirement Mapping

This checklist maps each requirement to implemented frontend files/pages for submission evidence.

## 1. Global UI & Design Rules

- 3-color direction + neutral, consistent tokens, dark mode contrast:
  - [src/app/globals.css](src/app/globals.css)
- Consistent section spacing and card style helpers:
  - [src/app/globals.css](src/app/globals.css)
- Uniform card/listing styles in tutors explore UI:
  - [src/components/modules/tutors/TutorExploreClient.tsx](src/components/modules/tutors/TutorExploreClient.tsx)
- Forms with validation/error/loading/success states:
  - [src/components/modules/authentication/login-form.tsx](src/components/modules/authentication/login-form.tsx)
  - [src/components/modules/authentication/register-form.tsx](src/components/modules/authentication/register-form.tsx)
- Responsive behavior across mobile/tablet/desktop:
  - [src/components/layout/Navbar.tsx](src/components/layout/Navbar.tsx)
  - [src/components/modules/tutors/TutorExploreClient.tsx](src/components/modules/tutors/TutorExploreClient.tsx)

## 2. Home / Landing Page

- Navbar: full-width, sticky, advanced menu, role-aware route counts:
  - [src/components/layout/Navbar.tsx](src/components/layout/Navbar.tsx)
- Hero: interactive, constrained height, clear flow:
  - [src/components/modules/homepage/HeroSection.tsx](src/components/modules/homepage/HeroSection.tsx)
- 10+ meaningful landing sections:
  - [src/app/(commonLayout)/page.tsx](src/app/(commonLayout)/page.tsx)
- Functional footer with contact + social + working links:
  - [src/components/layout/Footer.tsx](src/components/layout/Footer.tsx)

## 3. Core Listing / Card Section

- Card includes image, title, short description, meta info, View Details button:
  - [src/components/modules/tutors/TutorExploreClient.tsx](src/components/modules/tutors/TutorExploreClient.tsx)
- Uniform card size/radius/layout:
  - [src/components/modules/tutors/TutorExploreClient.tsx](src/components/modules/tutors/TutorExploreClient.tsx)
- Desktop 4 cards per row:
  - [src/components/modules/tutors/TutorExploreClient.tsx](src/components/modules/tutors/TutorExploreClient.tsx)
- Skeleton loader:
  - [src/components/modules/tutors/TutorExploreClient.tsx](src/components/modules/tutors/TutorExploreClient.tsx)

## 4. Details Page

- Public details page with media, overview, key info, reviews, related items:
  - [src/app/(commonLayout)/tutors/[id]/page.tsx](src/app/(commonLayout)/tutors/[id]/page.tsx)

## 5. Listing / Explore Page

- Search + filtering (category, rating) + sorting + pagination:
  - [src/components/modules/tutors/TutorExploreClient.tsx](src/components/modules/tutors/TutorExploreClient.tsx)
- Public route using shared explore module:
  - [src/app/(commonLayout)/tutors/page.tsx](src/app/(commonLayout)/tutors/page.tsx)
- Student route using same shared module (strict parity):
  - [src/app/student/tutors/page.tsx](src/app/student/tutors/page.tsx)

## 6. Authentication System

- Login + register pages:
  - [src/app/(commonLayout)/login/page.tsx](src/app/(commonLayout)/login/page.tsx)
  - [src/app/(commonLayout)/register/page.tsx](src/app/(commonLayout)/register/page.tsx)
- Validation + errors + loaders + demo login + social login buttons:
  - [src/components/modules/authentication/login-form.tsx](src/components/modules/authentication/login-form.tsx)
  - [src/components/modules/authentication/register-form.tsx](src/components/modules/authentication/register-form.tsx)

## 7. Dashboard (Role-Based)

- Role-based sidebar navigation definitions:
  - [src/routes/userRoutes.ts](src/routes/userRoutes.ts)
  - [src/routes/tutorRoutes.ts](src/routes/tutorRoutes.ts)
  - [src/routes/adminRoutes.ts](src/routes/adminRoutes.ts)
- Dashboard profile dropdown menu in navbar headers:
  - [src/components/layout/dashboard-user-menu.tsx](src/components/layout/dashboard-user-menu.tsx)
  - [src/app/student/layout.tsx](src/app/student/layout.tsx)
  - [src/app/tutor/layout.tsx](src/app/tutor/layout.tsx)
  - [src/app/admin/layout.tsx](src/app/admin/layout.tsx)
- Overview cards + charts + data surfaces:
  - [src/app/student/page.tsx](src/app/student/page.tsx)
  - [src/app/tutor/dashboard/page.tsx](src/app/tutor/dashboard/page.tsx)
  - [src/app/admin/page.tsx](src/app/admin/page.tsx)
- Dashboard tables with filtering/pagination:
  - [src/app/admin/users/page.tsx](src/app/admin/users/page.tsx)
  - [src/app/admin/bookings/page.tsx](src/app/admin/bookings/page.tsx)
- Editable profile pages:
  - [src/app/student/profile/page.tsx](src/app/student/profile/page.tsx)
  - [src/app/tutor/profile/page.tsx](src/app/tutor/profile/page.tsx)
  - [src/app/admin/profile/page.tsx](src/app/admin/profile/page.tsx)

## 8. AI Feature Implementation & Additional Pages

- AI-powered search suggestions as user types:
  - [src/components/modules/tutors/TutorExploreClient.tsx](src/components/modules/tutors/TutorExploreClient.tsx)
- Personalized suggestions using recent user search behavior:
  - [src/components/modules/tutors/TutorExploreClient.tsx](src/components/modules/tutors/TutorExploreClient.tsx)
- Additional pages added:
  - [src/app/(commonLayout)/about/page.tsx](src/app/(commonLayout)/about/page.tsx)
  - [src/app/(commonLayout)/contact/page.tsx](src/app/(commonLayout)/contact/page.tsx)
  - [src/app/(commonLayout)/blog/page.tsx](src/app/(commonLayout)/blog/page.tsx)
  - [src/app/(commonLayout)/help/page.tsx](src/app/(commonLayout)/help/page.tsx)
  - [src/app/(commonLayout)/privacy/page.tsx](src/app/(commonLayout)/privacy/page.tsx)

## 9. UX & Responsiveness

- Responsive landing and navigation:
  - [src/components/layout/Navbar.tsx](src/components/layout/Navbar.tsx)
  - [src/components/modules/homepage/HeroSection.tsx](src/components/modules/homepage/HeroSection.tsx)
- Responsive listing and cards:
  - [src/components/modules/tutors/TutorExploreClient.tsx](src/components/modules/tutors/TutorExploreClient.tsx)
- Dark mode contrast improvements:
  - [src/app/globals.css](src/app/globals.css)

## 10. Final Submission Requirements (to fill before submit)

- Live Website URL: Pending deployment
- GitHub Repository Link: [github.com/RownokNishat/skillbridge-frontend](https://github.com/RownokNishat/skillbridge-frontend)
- Frontend and Backend code: Frontend in this repository, backend repository link to be attached
- Demo Credentials:
  - User Email: student@skillbridge.com
  - User Password: Student@123
  - Admin Email: admin@skillbridge.com
  - Admin Password: Admin@123
