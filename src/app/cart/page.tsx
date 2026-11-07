import type { Metadata } from "next";
import CartView from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Shopping Cart | FreshCart",
  description:
    "Review the items in your FreshCart shopping cart, update quantities, and proceed to a secure checkout.",
};

export default function CartPage() {
  return <CartView />;
}
