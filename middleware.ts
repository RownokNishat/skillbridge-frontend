import { NextRequest, NextResponse } from "next/server";

// Temporarily disabled - using client-side RoleProtector instead
// This is due to cross-origin cookie issues between localhost:3000 and localhost:5000
export default function middleware(request: NextRequest) {
  return NextResponse.next();
}

// Empty matcher - middleware is disabled
export const config = {
  matcher: [],
};
