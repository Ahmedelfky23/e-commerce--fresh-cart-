import { getUserOrders } from "@/actions/order.actions";
import OrdersView from "@/components/orders/OrdersView";

export const metadata = {
  title: "My Orders | FreshCart",
  description: "Track and review your orders at FreshCart.",
};

export const revalidate = 0;

export default async function OrdersPage() {
  const res = await getUserOrders();
  const initialOrders =
    res.status === "success" && Array.isArray(res.data) ? res.data : undefined;

  return <OrdersView initialOrders={initialOrders} />;
}
