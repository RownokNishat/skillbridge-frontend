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
import { GraduationCap, Users } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "This field is required"),
  password: z.string().min(8, "Minimum length is 8"),
  email: z.email(),
  role: z.enum(["STUDENT", "TUTOR"], {
    required_error: "Please select a role",
  }),
});

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const data = authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });

    console.log(data);
  };

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "" as "STUDENT" | "TUTOR",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating user");
      try {
        const data = await api.post("/api/register", {
          email: value.email,
          password: value.password,
          name: value.name,
          role: value.role,
        });

        toast.success("User Created Successfully! Please login to continue.", {
          id: toastId,
        });

        // Redirect to login page after successful registration
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } catch (err: any) {
        toast.error(err.message || "Something went wrong, please try again.", {
          id: toastId,
        });
      }
    },
  });

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Join SkillBridge Today</CardTitle>
        <CardDescription>
          Create your account and start learning from expert tutors
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
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      type="text"
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
            <form.Field
              name="role"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel>I want to register as</FieldLabel>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <button
                        type="button"
                        onClick={() => field.handleChange("STUDENT")}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          field.state.value === "STUDENT"
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <GraduationCap
                            className={`w-8 h-8 ${
                              field.state.value === "STUDENT"
                                ? "text-blue-600"
                                : "text-gray-600 dark:text-gray-400"
                            }`}
                          />
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Student
                          </span>
                          <span className="text-xs text-gray-600 dark:text-gray-400 text-center">
                            Learn from expert tutors
                          </span>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => field.handleChange("TUTOR")}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          field.state.value === "TUTOR"
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Users
                            className={`w-8 h-8 ${
                              field.state.value === "TUTOR"
                                ? "text-blue-600"
                                : "text-gray-600 dark:text-gray-400"
                            }`}
                          />
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Tutor
                          </span>
                          <span className="text-xs text-gray-600 dark:text-gray-400 text-center">
                            Share your knowledge
                          </span>
                        </div>
                      </button>
                    </div>
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
          Register
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
