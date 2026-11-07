"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { changeLoggedUserPassword } from "@/actions/auth.actions";

export default function ProfileView() {
  const { data: session } = useSession();
  const user = session?.user;
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: "",
      });
    }
  }, [user]);
  const [password, setPassword] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    next: false,
    confirm: false,
  });
  const [feedback, setFeedback] = useState<null | {
    type: "profile" | "password";
    message: string;
  }>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  function handleProfileSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback({ type: "profile", message: "Profile updated successfully." });
  }

  async function handlePasswordSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password.next.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }

    if (password.next !== password.confirm) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    setIsChangingPassword(true);
    try {
      const res = await changeLoggedUserPassword({
        currentPassword: password.current,
        password: password.next,
        rePassword: password.confirm,
      });

      if (res?.status === "success") {
        toast.success(res.message || "Password changed successfully.");
        setFeedback({
          type: "password",
          message: "Password changed successfully.",
        });
        setPassword({ current: "", next: "", confirm: "" });
      } else {
        toast.error(res?.message || "Failed to change password.");
      }
    } catch {
      toast.error("An error occurred while changing password.");
    } finally {
      setIsChangingPassword(false);
    }
  }

  const inputClass =
    "h-[50px] w-full rounded-xl border border-[#e5e7eb] px-4 text-base leading-6 font-medium text-[#364153] outline-none transition-colors placeholder:text-[#99a1af] focus:border-[#16a34a]";

  return (
    <div className="flex flex-col gap-6">
      {/* Profile information */}
      <section className="overflow-hidden rounded-3xl border border-[#f3f4f6] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.06)]">
        <div className="flex flex-col gap-6 p-6 md:p-8">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#dcfce7] text-brand">
              <i className="fa-solid fa-user text-[22px]" aria-hidden />
            </span>
            <div>
              <h2 className="text-base leading-6 font-bold text-[#101828]">
                Profile Information
              </h2>
              <p className="text-sm leading-5 font-medium text-[#6a7282]">
                Update your personal details
              </p>
            </div>
          </div>

          <form onSubmit={handleProfileSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="profile-name"
                className="text-sm leading-5 font-medium text-[#364153]"
              >
                Full Name
              </label>
              <input
                id="profile-name"
                type="text"
                autoComplete="name"
                required
                value={profile.name}
                onChange={(event) =>
                  setProfile((prev) => ({ ...prev, name: event.target.value }))
                }
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="profile-email"
                className="text-sm leading-5 font-medium text-[#364153]"
              >
                Email Address
              </label>
              <input
                id="profile-email"
                type="email"
                autoComplete="email"
                required
                value={profile.email}
                onChange={(event) =>
                  setProfile((prev) => ({ ...prev, email: event.target.value }))
                }
                placeholder="Enter your email"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="profile-phone"
                className="text-sm leading-5 font-medium text-[#364153]"
              >
                Phone Number
              </label>
              <input
                id="profile-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                pattern="[0-9+ ]{10,15}"
                value={profile.phone}
                onChange={(event) =>
                  setProfile((prev) => ({ ...prev, phone: event.target.value }))
                }
                placeholder="01xxxxxxxxx"
                className={inputClass}
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                type="submit"
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-brand px-6 py-3 text-base leading-6 font-semibold text-white shadow-[0_4px_6px_rgba(22,163,74,0.25),0_10px_15px_rgba(22,163,74,0.25)] transition-colors hover:bg-[#15803d]"
              >
                <i
                  className="fa-solid fa-floppy-disk text-[14px]"
                  aria-hidden
                />
                Save Changes
              </button>

              {feedback?.type === "profile" && (
                <p
                  role="status"
                  className="flex items-center gap-2 text-sm leading-5 font-medium text-[#008236]"
                >
                  <i
                    className="fa-solid fa-circle-check text-[13px]"
                    aria-hidden
                  />
                  {feedback.message}
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Account information footer */}
        <div className="flex flex-col gap-4 bg-[#f9fafb] p-6 md:p-8">
          <h3 className="text-base leading-6 font-bold text-[#101828]">
            Account Information
          </h3>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm leading-5 font-medium text-[#6a7282]">
                User ID
              </span>
              <span className="font-mono text-xs leading-5 font-medium text-[#364153]">
                —
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm leading-5 font-medium text-[#6a7282]">
                Role
              </span>
              <span className="inline-flex rounded-lg bg-[#dcfce7] px-3 py-1 text-sm leading-5 font-medium text-[#15803d]">
                user
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Change password */}
      <section className="rounded-3xl border border-[#f3f4f6] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.06)]">
        <div className="flex flex-col gap-6 p-6 md:p-8">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#fef3c6] text-[#e17100]">
              <i className="fa-solid fa-lock text-[22px]" aria-hidden />
            </span>
            <div>
              <h3 className="text-base leading-6 font-bold text-[#101828]">
                Change Password
              </h3>
              <p className="text-sm leading-5 font-medium text-[#6a7282]">
                Update your account password
              </p>
            </div>
          </div>

          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="current-password"
                className="text-sm leading-5 font-medium text-[#364153]"
              >
                Current Password
              </label>
              <div className="relative">
                <input
                  id="current-password"
                  type={showPassword.current ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password.current}
                  onChange={(event) =>
                    setPassword((prev) => ({
                      ...prev,
                      current: event.target.value,
                    }))
                  }
                  placeholder="Enter your current password"
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      current: !prev.current,
                    }))
                  }
                  aria-label={
                    showPassword.current
                      ? "Hide current password"
                      : "Show current password"
                  }
                  className="absolute top-1/2 right-4 flex -translate-y-1/2 cursor-pointer items-center justify-center text-[#99a1af] transition-colors hover:text-[#4a5565]"
                >
                  <i
                    className={`fa-solid ${
                      showPassword.current ? "fa-eye-slash" : "fa-eye"
                    } text-[15px]`}
                    aria-hidden
                  />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="new-password"
                className="text-sm leading-5 font-medium text-[#364153]"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showPassword.next ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={password.next}
                  onChange={(event) =>
                    setPassword((prev) => ({
                      ...prev,
                      next: event.target.value,
                    }))
                  }
                  placeholder="Enter your new password"
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => ({ ...prev, next: !prev.next }))
                  }
                  aria-label={
                    showPassword.next
                      ? "Hide new password"
                      : "Show new password"
                  }
                  className="absolute top-1/2 right-4 flex -translate-y-1/2 cursor-pointer items-center justify-center text-[#99a1af] transition-colors hover:text-[#4a5565]"
                >
                  <i
                    className={`fa-solid ${
                      showPassword.next ? "fa-eye-slash" : "fa-eye"
                    } text-[15px]`}
                    aria-hidden
                  />
                </button>
              </div>
              <p className="text-xs leading-4 font-medium text-[#6a7282]">
                Must be at least 6 characters
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="confirm-password"
                className="text-sm leading-5 font-medium text-[#364153]"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showPassword.confirm ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={password.confirm}
                  onChange={(event) =>
                    setPassword((prev) => ({
                      ...prev,
                      confirm: event.target.value,
                    }))
                  }
                  placeholder="Confirm your new password"
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      confirm: !prev.confirm,
                    }))
                  }
                  aria-label={
                    showPassword.confirm
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  className="absolute top-1/2 right-4 flex -translate-y-1/2 cursor-pointer items-center justify-center text-[#99a1af] transition-colors hover:text-[#4a5565]"
                >
                  <i
                    className={`fa-solid ${
                      showPassword.confirm ? "fa-eye-slash" : "fa-eye"
                    } text-[15px]`}
                    aria-hidden
                  />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={isChangingPassword}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#e17100] px-6 py-3 text-base leading-6 font-semibold text-white shadow-[0_4px_6px_rgba(225,113,0,0.25),0_10px_15px_rgba(225,113,0,0.25)] transition-colors hover:bg-[#c25f00] disabled:cursor-wait disabled:opacity-75"
              >
                {isChangingPassword ? (
                  <>
                    <i
                      className="fa-solid fa-circle-notch animate-spin text-[14px]"
                      aria-hidden
                    />
                    Updating...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-key text-[14px]" aria-hidden />
                    Change Password
                  </>
                )}
              </button>

              {feedback?.type === "password" && (
                <p
                  role="status"
                  className="flex items-center gap-2 text-sm leading-5 font-medium text-[#008236]"
                >
                  <i
                    className="fa-solid fa-circle-check text-[13px]"
                    aria-hidden
                  />
                  {feedback.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
