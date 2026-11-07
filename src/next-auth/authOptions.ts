import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "example@example.com" },
        password: { label: "password", type: "password", placeholder: "**********" },
      },
      async authorize(credentials) {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const result = await res.json();
       const jwt : {id: string} =jwtDecode(result.token)
        if (res.ok && result.token) {
          return {
            id: jwt.id,
            name: result.user.name,
            email: result.user.email,
            token: result.token, 
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
