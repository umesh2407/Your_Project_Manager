import connectMongoDB from "@/libs/mongodb";
import { Department } from "@/models/Project";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const dept = await Department.find({ college: id });
    return NextResponse.json({ dept }, { status: 200 });
} 