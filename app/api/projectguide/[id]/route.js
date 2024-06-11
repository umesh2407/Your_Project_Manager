import connectMongoDB from "@/libs/mongodb";
import { ProjectGuide } from "@/models/Project";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newGuideName: guide_name, newDrpt: department } = await request.json();
    await connectMongoDB();
    await ProjectGuide.findByIdAndUpdate(id, { guide_name, department });
    return NextResponse.json({ message: "Project Guide Updated" }, { status: 200 })
}


export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const guide = await ProjectGuide.findOne({ _id: id });
    return NextResponse.json({ guide }, { status: 200 });
} 