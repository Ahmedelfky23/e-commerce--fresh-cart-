"use server";

import { getMytoken } from "@/utilities";
import type { ReviewPayload } from "@/types";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

async function reviewRequest(endpoint: string, method = "GET", body?: object) {
  const token = await getMytoken();

  const headers: Record<string, string> = {
    "content-type": "application/json",
  };
  if (token) {
    headers.token = token;
  }

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let data: Record<string, any> | null = null;
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
        data?.errors?.msg ||
        (data?.message && data.message !== "fail" ? data.message : null) ||
        data?.statusMsg ||
        "Failed to process review";

      return {
        status: "fail",
        message: errorMsg,
      };
    }

    return {
      status: "success",
      message:
        data?.message && data.message !== "fail"
          ? data.message
          : "Review saved successfully",
      data: data?.data ?? data,
    };
  } catch (error) {
    return {
      status: "fail",
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

export async function getProductReviews(productId: string) {
  return reviewRequest(`/products/${productId}/reviews`);
}

export async function createProductReview(
  productId: string,
  payload: ReviewPayload,
) {
  const token = await getMytoken();
  if (!token) {
    return { status: "fail", message: "Please sign in to write a review" };
  }
  return reviewRequest(`/products/${productId}/reviews`, "POST", payload);
}

export async function updateReview(
  reviewId: string,
  payload: ReviewPayload,
) {
  const token = await getMytoken();
  if (!token) {
    return { status: "fail", message: "Please sign in to update your review" };
  }
  return reviewRequest(`/reviews/${reviewId}`, "PUT", payload);
}

// 4. حذف المراجعة
export async function deleteReview(reviewId: string) {
  const token = await getMytoken();
  if (!token) {
    return { status: "fail", message: "Please sign in to delete your review" };
  }
  return reviewRequest(`/reviews/${reviewId}`, "DELETE");
}
