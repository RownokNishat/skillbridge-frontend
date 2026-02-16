import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {},

  client: {
    NEXT_PUBLIC_BACKEND_URL: z.string().min(1),
    NEXT_PUBLIC_FRONTEND_URL: z.string().min(1),
    NEXT_PUBLIC_API_URL: z.string().min(1),
    NEXT_PUBLIC_AUTH_URL: z.string().min(1),
    NEXT_PUBLIC_TEST: z.string().min(1),
  },

  runtimeEnv: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000",
    NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
    NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:5000",
    NEXT_PUBLIC_TEST: process.env.NEXT_PUBLIC_TEST || "http://localhost:5000/test",
  },
  
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
