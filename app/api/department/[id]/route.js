import connectMongoDB from "@/libs/mongodb";
import { Department } from "@/models/Project";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newDeptName: department_name, newCollege: college } = await request.json();
    await connectMongoDB();
    await Department.findByIdAndUpdate(id, { department_name, college });
    return NextResponse.json({ message: "Department Updated" }, { status: 200 })
}


export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const dept = await Department.findOne({ _id: id }).populate('college').exec();
    return NextResponse.json({ dept }, { status: 200 });
}

