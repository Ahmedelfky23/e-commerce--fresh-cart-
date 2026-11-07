import AccountShell from "@/components/profile/AccountShell";
import ProfileView from "@/components/profile/ProfileView";

export const metadata = {
  title: "Account Settings | FreshCart",
  description: "Manage your FreshCart account settings and preferences.",
};

export default function ProfilePage() {
  return (
    <AccountShell active="settings">
      <ProfileView />
    </AccountShell>
  );
}
