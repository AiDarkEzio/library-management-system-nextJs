import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    email: string;
    id: string;
    firstName: string;
    lastName?: string | null;
    role: string;
    image?: string | null;
  }
  interface Session {
    user: User & {
      email: string;
      firstName: string
      lastName: string;
      role: string;
      id: string;
    };
    token: {
      email: string;
    }
  }
}
