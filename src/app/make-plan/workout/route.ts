import { callChatGPT } from "@/app/libs/chat-gpt";
import { connect } from "@/app/libs/mogodb";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic' // defaults to auto

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const prompt = `date of birth ${reqBody?.dateOfBirth} weight ${reqBody?.weight} height ${reqBody?.height} and weekly activity ${reqBody?.weeklyActivity?.map((({ weeklyActivity }: any) => weeklyActivity))?.join(',')
            } and goals ${reqBody.goals?.join(',')} generate workout plan for 1 week`
        const res = await callChatGPT(prompt)
        return NextResponse.json({
            results: res.join('').split('\n')
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}