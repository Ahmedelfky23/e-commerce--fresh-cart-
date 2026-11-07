import * as zod from "zod";

export const signUpSchema = zod
  .object({
    name: zod
      .string()
      .min(3, "Name must be at least 3 characters")
      .nonempty("Name is required"),
    email: zod
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),
    password: zod
      .string()
      .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character")
      .nonempty("Password is required"),
    rePassword: zod.string().nonempty("Please confirm your password"),
    phone: zod
      .string()
      .regex(/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number (e.g., 01012345678)")
      .nonempty("Phone number is required"),
    terms: zod
      .boolean()
      .refine((val) => val === true, "Terms must be accepted"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });

export type SignUpFormValues = zod.infer<typeof signUpSchema>;

