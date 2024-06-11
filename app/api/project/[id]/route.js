import connectMongoDB from "@/libs/mongodb";
import { Project } from "@/models/Project";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { updateStep: currentStage } = await request.json();
    await connectMongoDB();
    await Project.findByIdAndUpdate(id, { currentStage });
    return NextResponse.json({ message: "Project Updated" }, { status: 200 })
}


export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const projects = await Project.findOne({ _id: id }).populate('guide').populate('department').exec();
    return NextResponse.json({ projects }, { status: 200 });
}

