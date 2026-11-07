export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
}

export interface OrderProduct {
  _id: string;
  title: string;
  imageCover: string;
  category?: {
    _id?: string;
    name?: string;
  };
  brand?: {
    _id?: string;
    name?: string;
  };
  ratingsAverage?: number;
}

export interface OrderCartItem {
  _id: string;
  price: number;
  count: number;
  product: OrderProduct;
}

export interface OrderUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface OrderType {
  _id: string;
  id?: number | string;
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  user: OrderUser;
  cartItems: OrderCartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutSessionResponse {
  status: string;
  message?: string;
  session?: {
    url: string;
    success_url: string;
    cancel_url: string;
  };
}

export interface CashOrderResponse {
  status: string;
  message?: string;
  data?: OrderType;
}

