import connectMongoDB from "@/libs/mongodb";
import {ProjectCoordinator} from "@/models/Project";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newCoordinator: coordinator_name, newDept: department } = await request.json();
    await connectMongoDB();
    await ProjectCoordinator.findByIdAndUpdate(id, { coordinator_name, department });
    return NextResponse.json({ message: "Project Coordinator Updated" }, { status: 200 })
}


export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const cord = await ProjectCoordinator.findOne({ department: id });
    return NextResponse.json({ cord }, { status: 200 });
} 