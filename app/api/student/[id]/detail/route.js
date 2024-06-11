import connectMongoDB from "@/libs/mongodb";
import { Student } from "@/models/Project";
import { NextResponse } from "next/server";




export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const students = await Student.find({ project: id });
    return NextResponse.json({ students }, { status: 200 });
} 