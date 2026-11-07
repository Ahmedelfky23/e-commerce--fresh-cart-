import AuthShell from "@/components/auth/AuthShell";
import AuthCard from "@/components/auth/AuthCard";
import AuthAside from "@/components/auth/AuthAside";
import VerifyCodeForm from "@/components/auth/VerifyCodeForm";
import type { VerifyCodePageProps } from "@/types";

export const metadata = {
  title: "Verify Code | FreshCart",
  description: "Enter the verification code sent to your email to reset your password.",
};

export default async function VerifyCodePage({
  searchParams,
}: VerifyCodePageProps) {
  const params = await searchParams;
  const email = Array.isArray(params.email) ? params.email[0] : params.email;

  return (
    <AuthShell aside={<AuthAside variant="verify" />}>
      <AuthCard
        title="Check Your Email"
        subtitle={
          <>
            Enter the 6-digit code sent to{" "}
            <span className="font-semibold text-[#101828]">
              {email || "your email address"}
            </span>
          </>
        }
        stepper={2}
      >
        <VerifyCodeForm email={email} />
      </AuthCard>
    </AuthShell>
  );
}
