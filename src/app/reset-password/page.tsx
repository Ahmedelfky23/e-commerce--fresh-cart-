import AuthShell from "@/components/auth/AuthShell";
import AuthCard from "@/components/auth/AuthCard";
import AuthAside from "@/components/auth/AuthAside";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import type { ResetPasswordPageProps } from "@/types";

export const metadata = {
  title: "Reset Password | FreshCart",
  description: "Create a new password for your FreshCart account.",
};

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const params = await searchParams;
  const email = Array.isArray(params.email) ? params.email[0] : params.email;

  return (
    <AuthShell aside={<AuthAside variant="reset" />}>
      <AuthCard
        title="Create New Password"
        subtitle="Your new password must be different from previous passwords"
        stepper={3}
      >
        <ResetPasswordForm email={email} />
      </AuthCard>
    </AuthShell>
  );
}
