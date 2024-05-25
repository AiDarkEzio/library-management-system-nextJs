import { db } from "@/lib/db";
import Password from "@/lib/password";
import { NextResponse } from "next/server";
import { z } from "zod";

// zod schema for user
const userSchema = z.object({
    firstName: z.string().min(3).max(15),
    lastName: z.string().min(3).max(15).optional(),
    email: z.string().email(),
    password: z.string().min(8),
})


type User = {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
}


export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, password }: User = body

        if (!firstName || !email || !password) {
            return NextResponse.json({ message: "All fields are required", user: null }, { status: 400 })
        }
        // validate body using zod
        const { success, error } = userSchema.safeParse(body)
        if (!success || error) {
            return NextResponse.json({ message: `Invalid body, ${error}`, user: null }, { status: 400 })
        }

        // check if user already exist
        const isUserExist = await db.user.findUnique({ where: { email } })
        if (isUserExist) {
            return NextResponse.json({ message: "User already exist", user: null }, { status: 400 })
        }

        const pass = new Password()
        const hashedPassword = pass.hashPassword(password)

        const { password: p, salt, ...user} = await db.user.create({ data: {  FName: firstName,  LName: lastName,  email,  password: hashedPassword.hashedPassword,  salt: hashedPassword.salt, authProviderType: 'CREDENTIALS' } })
        return NextResponse.json({ message: "User created successfully", user }, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Something went wrong", user: null }, { status: 500 })
    }
}