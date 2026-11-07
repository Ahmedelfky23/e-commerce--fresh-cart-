"use server";

import { getMytoken } from "@/utilities";
import { addressSchema } from "@/schemas/checkout.schema";
import type { AddressPayload } from "@/types";

const API_URL = "https://ecommerce.routemisr.com/api/v1/addresses";

async function addressRequest(endpoint = "", method = "GET", body?: object) {
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

export async function getLoggedUserAddresses() {
  return addressRequest();
}

export async function getSpecificAddress(addressId: string) {
  return addressRequest(`/${addressId}`);
}

export async function addAddress(payload: AddressPayload) {
  const validation = addressSchema.safeParse(payload);
  if (!validation.success) {
    return {
      status: "fail",
      message: validation.error.issues[0]?.message || "Invalid address data",
    };
  }
  return addressRequest("", "POST", payload);
}

export async function removeAddress(addressId: string) {
  return addressRequest(`/${addressId}`, "DELETE");
}

