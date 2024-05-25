import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";
import Password from "@/lib/password";

export const option: AuthOptions = {
  // adapter: PrismaAdapter(db),
  // session: {
  //   strategy: "jwt",
  // },
  // pages: {
  //   signIn: "/sign-in",
  // },
  secret: process.env.NEXTAUTH_SECRET as string,
  theme: {
    colorScheme: "dark",
    brandColor: "#8523e8",
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log(token);
      console.log(user);
      console.log(account);
      console.log(profile);
      console.log(isNewUser);

      if (user) {
        return {
          ...token,
          email: user.email,
        };
      }
      return token;
    },
    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...user,
          email: token.email,
        },
        token: token,
      };
    },
    async signIn({ account, profile }) {
      if (account?.type === "credentials") return true;
      if (!profile?.email) return false;

      await db.user.upsert({
        where: { email: profile.email },
        create: {
          email: profile.email,
          FName: profile.name ? profile.name?.split(" ")[0] : "",
          LName: profile.name ? profile.name?.split(" ")[1] : null,
          authProviderType: "OAUTH",
          image: profile.image,
        },
        update: {
          image: profile.image,
          FName: profile.name ? profile.name?.split(" ")[0] : "",
          LName: profile.name ? profile.name?.split(" ")[1] : null,
        },
      });

      return true;
    },
    redirect({ url, baseUrl }) {
      return baseUrl;
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await db.user.findUnique({
          where: { email: credentials?.email, authProviderType: "CREDENTIALS" },
        });
        if (!user) return null;
        if (!user.password || !user.salt) return null;

        const pass = new Password();
        const isValidPassword = pass.verifyPassword(
          credentials.password,
          user.salt,
          user.password
        );
        if (!isValidPassword) return null;

        return {
          id: `${user.id}`,
          firstName: user.FName,
          lastName: user.LName,
          email: user.email,
          role: user.role,
          image: user.image,
        };
      },
    }),
  ],
};
