"use server";

import { getMytoken, getMyUserId } from "@/utilities";
import { shippingAddressSchema } from "@/schemas/checkout.schema";
import type { ShippingAddress } from "@/types";

const BASE_URL = "https://ecommerce.routemisr.com/api";

//  موحد لجميع طلبات الـ Orders
async function orderRequest(
  url: string,
  method = "GET",
  body?: object,
  needToken = true,
) {
  const headers: Record<string, string> = {
    "content-type": "application/json",
  };

  const token = await getMytoken();
  if (token) {
    headers.token = token;
  } else if (needToken) {
    return { status: "fail", message: "Please sign in first" };
  }

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let data: any = null;
    const text = await res.text();
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = null;
      }
    }

    if (!res.ok) {
      const errorMsg =
        data?.message && data.message !== "fail"
          ? data.message
          : data?.errors?.msg || "Failed to process order";

      return {
        status: "fail",
        message: errorMsg,
      };
    }

    return {
      status: "success",
      message: data?.message || "Operation successful",
      data: data?.data ?? data,
      session: data?.session,
    };
  } catch (error) {
    return {
      status: "fail",
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

// ==========================================
// 1. الدفع كاش عند الاستلام (Create Cash Order)
// ==========================================
export async function createCashOrder(
  cartId: string,
  shippingAddress: ShippingAddress,
) {
  const validation = shippingAddressSchema.safeParse(shippingAddress);
  if (!validation.success) {
    return {
      status: "fail",
      message: validation.error.issues[0]?.message || "Invalid shipping address",
    };
  }

  const resV2 = await orderRequest(
    `${BASE_URL}/v2/orders/${cartId}`,
    "POST",
    { shippingAddress },
    true,
  );

  if (resV2.status === "success") {
    return resV2;
  }

  // Fallback to v1
  return orderRequest(
    `${BASE_URL}/v1/orders/${cartId}`,
    "POST",
    { shippingAddress },
    true,
  );
}

// ==========================================
// 2. الدفع أونلاين عبر فيزا / ماستركارد (Online Payment Session)
// ==========================================
export async function createOnlineOrder(
  cartId: string,
  shippingAddress: ShippingAddress,
  returnUrl = "http://localhost:3000",
) {
  const validation = shippingAddressSchema.safeParse(shippingAddress);
  if (!validation.success) {
    return {
      status: "fail",
      message: validation.error.issues[0]?.message || "Invalid shipping address",
    };
  }

  const encodedUrl = encodeURIComponent(returnUrl);
  return orderRequest(
    `${BASE_URL}/v1/orders/checkout-session/${cartId}?url=${encodedUrl}`,
    "POST",
    { shippingAddress },
    true,
  );
}

// ==========================================
// 3. جلب أوردرات المستخدم المسجل (Get User Orders)
// ==========================================
export async function getUserOrders(userId?: string) {
  const currentUserId = userId || (await getMyUserId());

  if (!currentUserId) {
    return { status: "fail", message: "User ID not found, please sign in" };
  }

  const res = await orderRequest(
    `${BASE_URL}/v1/orders/user/${currentUserId}`,
    "GET",
    undefined,
    false,
  );

  return res;
}

// ==========================================
// 4. جلب جميع الأوردرات (Get All Orders)
// ==========================================
export async function getAllOrders() {
  return orderRequest(`${BASE_URL}/v1/orders/`, "GET", undefined, false);
}
