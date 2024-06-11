import connectMongoDB from "@/libs/mongodb";
import { Task } from "@/models/Project";
import { NextResponse } from "next/server";



export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const tasks = await Task.find({ project: id });
    return NextResponse.json({ tasks }, { status: 200 });
} 