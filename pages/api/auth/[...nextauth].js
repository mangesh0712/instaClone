import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUserProfileDocument } from "../../../firebase";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signin",
    // signOut: "/auth/signout",
  },
  callbacks: {
    async session({ session, token, user }) {
      // alert("f");
      session.user.username = session.user.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();
      session.user.uid = token.sub;
      session.user.token = token;
      // alert("f");
      // console.log(session, "1");
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
});
