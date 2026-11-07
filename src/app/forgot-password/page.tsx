import AuthShell from "@/components/auth/AuthShell";
import AuthCard from "@/components/auth/AuthCard";
import AuthAside from "@/components/auth/AuthAside";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password | FreshCart",
  description: "Reset your FreshCart account password.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell aside={<AuthAside variant="forgot" />}>
      <AuthCard
        title="Forgot Password?"
        subtitle="No worries, we'll send you a reset code"
        stepper={1}
      >
        <ForgotPasswordForm />
      </AuthCard>
    </AuthShell>
  );
}
