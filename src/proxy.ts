import { NextRequest, NextResponse } from "next/server";

const publicPaths = [
  "/",
  "/login",
  "/register",
  "/about",
  "/contact",
  "/tutors",
  "/blog",
  "/help",
  "/privacy",
  "/not-found",
];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  console.log("Middleware executing for path:", pathname);

  if (
    publicPaths.some((p) => pathname === p || (p !== "/" && pathname.startsWith(p + "/"))) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  console.log("All cookies:", request.cookies.getAll());
  
  // Check for frontend-set cookies first (set after login)
  let sessionToken = request.cookies.get("sb_session_token")?.value;
  const userRole = request.cookies.get("sb_user_role")?.value;
  
  // Fallback to better-auth cookies (in case same-domain setup)
  if (!sessionToken) {
    sessionToken = request.cookies.get("better-auth.session_token")?.value;
  }
  if (!sessionToken) {
    sessionToken = request.cookies.get("better-auth.session-token")?.value;
  }

  if (!sessionToken) {
    console.log("No session token found, redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  console.log("Session token found:", sessionToken.substring(0, 20) + "...");
  console.log("User role from cookie:", userRole);

  // If we have the role cookie, use it directly (faster, no backend call)
  if (userRole) {
    const role = userRole.toUpperCase();
    
    // Admin role checks
    if (role === "ADMIN") {
      if (pathname.startsWith("/dashboard") || pathname.startsWith("/tutor")) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    } else {
      // Non-admin users can't access admin routes
      if (pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      if (role === "TUTOR" && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/tutor/dashboard", request.url));
      }

      if (role === "STUDENT" && pathname.startsWith("/tutor")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    return NextResponse.next();
  }

  // Fallback: validate session with backend if no role cookie
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`,
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
    console.log("Session data received:", JSON.stringify(data, null, 2));

    const fetchedRole = data?.user?.role?.toUpperCase();

    if (!fetchedRole) {
      console.log("No user role found in session data");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Admin role checks
    if (fetchedRole === "ADMIN") {
      if (pathname.startsWith("/dashboard") || pathname.startsWith("/tutor")) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    } else {
      if (pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      if (fetchedRole === "TUTOR" && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/tutor/dashboard", request.url));
      }

      if (fetchedRole === "STUDENT" && pathname.startsWith("/tutor")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error validating session:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
