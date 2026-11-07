import AuthShell from "@/components/auth/AuthShell";
import AuthCard from "@/components/auth/AuthCard";
import { LoginAside } from "@/components/auth/AuthAside";
import SignInForm from "@/components/auth/SignInForm";

export const metadata = {
  title: "Sign In | FreshCart",
  description: "Sign in to your FreshCart account to continue shopping.",
};

export default function SignInPage() {
  return (
    <AuthShell aside={<LoginAside />}>
      <AuthCard
        title="Welcome Back!"
        subtitle="Sign in to continue your fresh shopping experience"
      >
        <SignInForm />
      </AuthCard>
    </AuthShell>
  );
}
