import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import cookie from "cookie";
import { cookies } from "next/headers";

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
          let setCookie = authResponse.headers.get("Set-Cookie");
          console.log("set-cookie", setCookie);
          if (setCookie) {
            const parsed = cookie.parse(setCookie);
            cookies().set("connect.sid", parsed["connect.sid"], parsed); // 브라우저에 쿠키를 심어주는 것
          }

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
