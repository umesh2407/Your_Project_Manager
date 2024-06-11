import connectMongoDB from "@/libs/mongodb";
import { Task } from "@/models/Project";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newActivity: activity_name, newStatus: status, newTime: timestamp, newProject: project } = await request.json();
    await connectMongoDB();
    await Task.findByIdAndUpdate(id, { activity_name, status, timestamp, project });
    return NextResponse.json({ message: "Task Updated" }, { status: 200 })
}


export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const tasks = await Task.findOne({ _id: id });
    return NextResponse.json({ tasks }, { status: 200 });
} 