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
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  password: z.string().min(8, "Minimum length is 8"),
  email: z.email(),
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const handleGoogleLogin = async () => {
    const data = authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
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

        // Store user info in localStorage for client-side access
        if ((data as any)?.user && typeof window !== "undefined") {
          console.log("Storing user in localStorage:", (data as any).user);
          localStorage.setItem("sb_user", JSON.stringify((data as any).user));
        }

        // Route user by role (handle different casing)
        if ((data as any)?.user?.role) {
          const role = String((data as any).user.role).toLowerCase();
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
        }
      } catch (err) {
        toast.error("Something went wrong, please try again.", { id: toastId });
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
        <Button form="login-form" type="submit" className="w-full">
          Login
        </Button>
        <Button
          onClick={() => handleGoogleLogin()}
          variant="outline"
          type="button"
          className="w-full"
        >
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
