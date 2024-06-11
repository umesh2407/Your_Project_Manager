import connectMongoDB from "@/libs/mongodb";
import { Project } from "@/models/Project";
import { NextResponse } from "next/server";



export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const projects = await Project.find({ department: id }).populate('guide').exec();;
    return NextResponse.json({ projects }, { status: 200 });
} 

