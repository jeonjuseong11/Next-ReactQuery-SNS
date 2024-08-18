import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  debug: true,
  pages: {
    signIn: "/i/flow/login",
    newUser: "/i/flow/signup",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: credentials.username,
              password: credentials.password,
            }),
          });

          if (!authResponse.ok) {
            const error = await authResponse.json();
            console.error("Authentication failed:", error); // 에러 로그 출력
            return null;
          }

          const user = await authResponse.json();
          if (!user || !user.id) {
            console.error("No user data returned from API");
            return null;
          }

          return {
            email: user.id,
            name: user.nickname,
            image: user.image,
            ...user,
          };
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null;
        }
      },
    }),
  ],
});
