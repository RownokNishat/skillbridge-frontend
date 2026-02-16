import { NextRequest, NextResponse } from "next/server";

// Temporarily disabled - using client-side RoleProtector instead
// This is due to cross-origin cookie issues between localhost:3000 and localhost:5000
export default function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
