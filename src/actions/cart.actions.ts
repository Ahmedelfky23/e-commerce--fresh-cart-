"use server";

import { getMytoken } from "@/utilities";

const API_URL = "https://ecommerce.routemisr.com/api/v2/cart";

async function cartRequest(endpoint = "", method = "GET", body?: object) {
  const token = await getMytoken();

  if (!token) {
    return { status: "fail", message: "Please sign in first" };
  }

  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: {
        token,
        "content-type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });

    return await res.json();
  } catch (error) {
    return {
      status: "fail",
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

export async function addTocart(productId: string) {
  return cartRequest("", "POST", { productId });
}

export async function getLoggedUserCart() {
  return cartRequest();
}

export async function updateCartItemCount(productId: string, count: number) {
  return cartRequest(`/${productId}`, "PUT", { count });
}

export async function removeCartItem(productId: string) {
  return cartRequest(`/${productId}`, "DELETE");
}

export async function clearUserCart() {
  return cartRequest("", "DELETE");
}

export async function applyCoupon(couponName: string) {
  if (!couponName || !couponName.trim()) {
    return { status: "fail", message: "Please enter a coupon code" };
  }
  return cartRequest("/applyCoupon", "PUT", { couponName: couponName.trim() });
}
