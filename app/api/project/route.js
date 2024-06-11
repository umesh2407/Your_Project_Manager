import connectMongoDB from "@/libs/mongodb"
import {Project} from "@/models/Project";
import { NextResponse } from "next/server";


export async function POST(request) {
    const { project_title, project_intro, domain, guide, department } = await request.json();
    await connectMongoDB();
    await Project.create({ project_title, project_intro, domain, guide, department });
    return NextResponse.json({ message: "Project created" }, { status: 201 })
}


export async function GET() {
    await connectMongoDB();
    const projects = await Project.find();
    return NextResponse.json({ projects });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Project.findByIdAndDelete(id);
    return NextResponse.json({ message: "Project Deleted" }, { status: 200 });
}

