import { connect } from "@/app/libs/mogodb";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

import Plan from "@/app/models/Plan";
import { getDataFromToken } from "@/app/libs/auth-token";

export const dynamic = "force-dynamic"; // defaults to auto

connect();

export async function GET(request: NextRequest) {
  try {
    const id = request.url.split("/")[4];

    const userId = await getDataFromToken(request);
    const plan = await Plan.findOne({ _id: id });

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 400 });
    }

    return NextResponse.json({ plan });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.url.split("/")[4];

    const plan = await Plan.findOne({ _id: id });

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 400 });
    }
    const deleted = await Plan.deleteOne({ _id: id });
    return NextResponse.json({ deleted });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
