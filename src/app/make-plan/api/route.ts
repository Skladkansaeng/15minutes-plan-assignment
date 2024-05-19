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
            } generate workout goals bullet point`
        const res = await callChatGPT(prompt)
        return NextResponse.json({
            results: res.join('')
            .split('\n').filter((text: string) => text.search('\d\.\s*'))
                .map((text: string) => text.split(' ').slice(1, text.split(' ').length).join(' '))
                .filter((text: string) => text)
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}