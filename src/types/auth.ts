import type { ReactNode } from "react";

export interface AuthAsideProps {
  variant: "forgot" | "verify" | "reset";
}

export interface AuthCardProps {
  title: string;
  subtitle: ReactNode;
  children: ReactNode;
  stepper?: 1 | 2 | 3;
  padding?: "wide" | "compact";
}

export interface AuthShellProps {
  aside?: ReactNode;
  hideAsideOnMobile?: boolean;
  children: ReactNode;
}

export interface AuthStepperProps {
  current: 1 | 2 | 3;
}

export interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
  labelAction?: ReactNode;
  hint?: string;
}

export interface SocialAuthProps {
  variant: "login" | "signup";
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface VerifyCodePayload {
  resetCode: string;
}

export interface ResetPasswordPayload {
  email: string;
  newPassword: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  password: string;
  rePassword: string;
}
