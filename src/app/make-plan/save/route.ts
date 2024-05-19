import { connect } from "@/app/libs/mogodb";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import Plan from "@/app/models/Plan";
import { getDataFromToken } from "@/app/libs/auth-token";

export const dynamic = 'force-dynamic' // defaults to auto

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()

        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 })
        }

        const newPlan = new Plan({
            userId: user._id,
            plan: JSON.stringify(reqBody.workoutPlan),
            personalInfo: JSON.stringify(reqBody.personalInfo)
        })

        const savedPlan = await newPlan.save()
        return NextResponse.json({ savedPlan });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}