import NextAuth from "next-auth";
import { option } from "@/lib/authOption";

const auth = NextAuth(option);

export { auth as GET, auth as POST }