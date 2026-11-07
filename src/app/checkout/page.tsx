import CheckoutView from "@/components/checkout/CheckoutView";

export const metadata = {
  title: "Checkout | FreshCart",
  description: "Complete your order with secure checkout at FreshCart.",
};

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  return <CheckoutView />;
}
