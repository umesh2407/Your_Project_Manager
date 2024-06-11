import connectMongoDB from "@/libs/mongodb";
import { ProjectGuide } from "@/models/Project";
import { NextResponse } from "next/server";




export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const guide = await ProjectGuide.find({ department: id });
    return NextResponse.json({ guide }, { status: 200 });
} 