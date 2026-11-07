import { redirect } from "next/navigation";

export const metadata = {
  title: "Orders | FreshCart",
};

export default function AllOrdersPage() {
  redirect("/orders");
}

