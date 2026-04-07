"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { api } from "@/lib/api";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  password: z.string().min(8, "Minimum length is 8"),
  email: z.email(),
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({ provider: "google", callbackURL: "/" });
  };

  const handleFacebookLogin = async () => {
    await authClient.signIn.social({ provider: "facebook", callbackURL: "/" } as any);
  };

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      const toastId = toast.loading("Logging in");
      try {
        const { data, error } = await authClient.signIn.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("User Logged in Successfully", { id: toastId });

        // Debug: log the response
        console.log("Login response:", { data, error });
        console.log("User object:", (data as any)?.user);
        console.log("User role:", (data as any)?.user?.role);

        // Fetch session to get the token and set frontend cookie
        const session = await authClient.getSession();
        console.log("Session after login:", session);
        
        if (session?.data?.session?.token) {
          // Set cookie on frontend domain for middleware access
          document.cookie = `sb_session_token=${session.data.session.token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
          console.log("Set frontend session cookie");
        }
        
        // Store user info in localStorage for client-side access
        const user = session?.data?.user || (data as any)?.user;
        if (user && typeof window !== "undefined") {
          console.log("Storing user in localStorage:", user);
          localStorage.setItem("sb_user", JSON.stringify(user));
          // Also set role in cookie for middleware
          document.cookie = `sb_user_role=${(user as any).role}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
        }

        // Route user by role (handle different casing)
        const userRole = (user as any)?.role;
        if (userRole) {
          const role = String(userRole).toLowerCase();
          console.log("Routing user with role:", role);

          if (role === "admin") {
            router.push("/admin");
            return;
          }

          if (role === "student") {
            router.push("/student");
            return;
          }

          if (role === "tutor") {
            try {
              const statusData = await api.get("/api/register/status");
              const nextStep = statusData?.data?.nextStep;

              switch (nextStep) {
                case "COMPLETE_PROFILE":
                  router.push("/tutor/create-profile");
                  break;
                case "UPDATE_PROFILE":
                  router.push("/tutor/profile");
                  break;
                case "SET_AVAILABILITY":
                  router.push("/tutor/availability");
                  break;
                case "READY":
                default:
                  router.push("/tutor/dashboard");
                  break;
              }
            } catch (err) {
              // If status check fails, go to dashboard
              console.error("Failed to check tutor status:", err);
              router.push("/tutor/dashboard");
            }
            return;
          }

          // Default fallback
          router.push("/dashboard");
        } else {
          // No role found at all, go to dashboard
          console.log("No role found, redirecting to dashboard");
          router.push("/dashboard");
        }
      } catch (err) {
        toast.error("Something went wrong, please try again.", { id: toastId });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Welcome Back to SkillBridge</CardTitle>
        <CardDescription>
          Sign in to continue your learning journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5 justify-end">
        <Button
          form="login-form"
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
        <div className="grid w-full gap-2 sm:grid-cols-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.setFieldValue("email", "student@skillbridge.com");
              form.setFieldValue("password", "Student@123");
              toast.success("Demo credentials autofilled");
            }}
          >
            Demo Login
          </Button>
          <Button type="button" variant="outline" onClick={handleGoogleLogin}>
            Google Login
          </Button>
          <Button type="button" variant="outline" onClick={handleFacebookLogin} className="sm:col-span-2">
            Facebook Login
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
