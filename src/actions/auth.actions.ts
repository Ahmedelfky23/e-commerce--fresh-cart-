"use server";

import { getMytoken } from "@/utilities";
import type { SignUpFormValues } from "@/schemas/signup.schema";
import type {
  ResetPasswordPayload,
  ChangePasswordPayload,
} from "@/types";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

// ==========================================
// 1. تسجيل حساب جديد (Sign Up)
// ==========================================
export async function UserSignup(data: SignUpFormValues) {
  try {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        rePassword: data.rePassword,
        phone: data.phone,
      }),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return {
      message:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.",
    };
  }
}

// ==========================================
//  موحد لطلبات استعادة وتغيير كلمة 
// ==========================================
async function authRequest(
  endpoint: string,
  method = "POST",
  body?: object,
  needToken = false,
) {
  const headers: Record<string, string> = {
    "content-type": "application/json",
  };

  if (needToken) {
    const token = await getMytoken();
    if (!token) {
      return { status: "fail", message: "Please sign in first" };
    }
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
        data?.errors?.msg ||
        (data?.message && data.message !== "fail" ? data.message : null) ||
        data?.statusMsg ||
        "Something went wrong";

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
          : "Operation successful",
      data: data?.data ?? data,
    };
  } catch (error) {
    return {
      status: "fail",
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

// ==========================================
// 2. إرسال كود استعادة كلمة المرور
// ==========================================
export async function forgotPassword(email: string) {
  return authRequest("/auth/forgotPasswords", "POST", { email });
}

// ==========================================
// 3. التحقق من كود الـ 6 أرقام
// ==========================================
export async function verifyResetCode(resetCode: string) {
  return authRequest("/auth/verifyResetCode", "POST", { resetCode });
}

// ==========================================
// 4. إعادة تعيين كلمة المرور الجديدة
// ==========================================
export async function resetPassword(payload: ResetPasswordPayload) {
  return authRequest("/auth/resetPassword", "PUT", payload);
}

// ==========================================
// 5. تغيير كلمة المرور للمستخدم المسجل
// ==========================================
export async function changeLoggedUserPassword(payload: ChangePasswordPayload) {
  return authRequest("/users/changeMyPassword", "PUT", payload, true);
}

