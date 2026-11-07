import * as zod from "zod";

export const signInSchema = zod.object({
  email: zod
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: zod
    .string()
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
    )

    .nonempty("Password is required"),
  remember: zod.boolean().optional(),
});

export type SignInFormValues = zod.infer<typeof signInSchema>;
