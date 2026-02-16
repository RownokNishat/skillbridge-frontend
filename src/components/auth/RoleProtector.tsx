"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface RoleProtectorProps {
  children: React.ReactNode;
  allowedRoles: string[];
  redirectTo?: string;
}

export function RoleProtector({ 
  children, 
  allowedRoles,
  redirectTo = "/login" 
}: RoleProtectorProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      console.log("No session found, redirecting to:", redirectTo);
      router.push(redirectTo);
      return;
    }

    const userRole = (session.user as any).role?.toUpperCase();
    const isAllowed = allowedRoles.some(
      role => role.toUpperCase() === userRole
    );

    if (!isAllowed) {
      console.log(`User role ${userRole} not in allowed roles:`, allowedRoles);
      
      // Redirect based on user role
      if (userRole === "ADMIN") {
        router.push("/admin");
      } else if (userRole === "TUTOR") {
        router.push("/tutor/dashboard");
      } else if (userRole === "STUDENT") {
        router.push("/student");
      } else {
        router.push("/dashboard");
      }
    }
  }, [session, isPending, router, allowedRoles, redirectTo]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const userRole = (session.user as any).role?.toUpperCase();
  const isAllowed = allowedRoles.some(
    role => role.toUpperCase() === userRole
  );

  if (!isAllowed) {
    return null;
  }

  return <>{children}</>;
}
