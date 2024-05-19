import { connect } from "@/app/libs/mogodb";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

import Plan from "@/app/models/Plan";
import { getDataFromToken } from "../libs/auth-token";

export const dynamic = 'force-dynamic' // defaults to auto

connect()

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const plan = await Plan.find({ userId: userId })

        if (!plan) {
            return NextResponse.json({ error: "Plan not found" }, { status: 400 })
        }

        return NextResponse.json({ plans: plan });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}