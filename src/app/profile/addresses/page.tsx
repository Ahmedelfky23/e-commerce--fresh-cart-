import AccountShell from "@/components/profile/AccountShell";
import AddressesView from "@/components/profile/AddressesView";

export const metadata = {
  title: "My Addresses | FreshCart",
  description: "Manage your delivery addresses on FreshCart.",
};

export default function AddressesPage() {
  return (
    <AccountShell active="addresses">
      <AddressesView />
    </AccountShell>
  );
}
