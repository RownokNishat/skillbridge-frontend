import { NextRequest, NextResponse } from "next/server";

const publicPaths = ["/", "/login", "/register", "/about", "/contact", "/tutors"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  console.log("Middleware executing for path:", pathname);

  // Skip auth check for public routes and static assets
  if (
    publicPaths.some((p) => pathname === p || (p !== "/" && pathname.startsWith(p + "/"))) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Get session token from cookies
  const sessionToken = request.cookies.get("better-auth.session_token")?.value;

  if (!sessionToken) {
    console.log("No session token found, redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Call backend to validate session
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/get-session`,
      {
        headers: {
          Cookie: `better-auth.session_token=${sessionToken}`,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.log("Session validation failed, redirecting to login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const data = await response.json();

    const userRole = data?.data?.user?.role?.toUpperCase();

    if (!userRole) {
      console.log("No user role found, redirecting to login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Admin role checks
    if (userRole === "ADMIN") {
      // Admin can't access user or tutor dashboards
      if (pathname.startsWith("/dashboard") || pathname.startsWith("/tutor")) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    } else {
      // Non-admin users can't access admin routes
      if (pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      // Tutor-specific routes
      if (userRole === "TUTOR" && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/tutor/dashboard", request.url));
      }

      // Student trying to access tutor routes
      if (userRole === "STUDENT" && pathname.startsWith("/tutor")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error validating session:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
