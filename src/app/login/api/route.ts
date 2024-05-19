import { connect } from "@/app/libs/mogodb";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken"

export const dynamic = 'force-dynamic' // defaults to auto

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }

        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ error: "Invlid password" }, { status: 400 })
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}