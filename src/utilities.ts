import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

async function getMyDecodedSession() {
  const cookie = await cookies();
  const myToken =
    cookie.get("next-auth.session-token")?.value ||
    cookie.get("__Secure-next-auth.session-token")?.value ||
    "";

  if (!myToken) return null;

  return decode({
    token: myToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });
}

export async function getMytoken() {
  const decodedToken = await getMyDecodedSession();
  return (decodedToken?.token as string) || null;
}

export async function getMyUserId() {
  const decodedToken = await getMyDecodedSession();
  if (!decodedToken) return null;
  if (decodedToken.id) return decodedToken.id as string;

  // Fallback: decode raw RouteMisr token if present
  if (decodedToken.token && typeof decodedToken.token === "string") {
    try {
      const parts = decodedToken.token.split(".");
      if (parts.length >= 2) {
        const payload = JSON.parse(
          Buffer.from(parts[1], "base64").toString("utf-8"),
        );
        return payload.id || payload._id || payload.userId || null;
      }
    } catch {
      return null;
    }
  }

  return null;
}

