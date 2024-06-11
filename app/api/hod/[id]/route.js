import connectMongoDB from "@/libs/mongodb";
import { HeadOfDepartment } from "@/models/Project";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newHOD: hod_name, newDept: department } = await request.json();
    await connectMongoDB();
    await HeadOfDepartment.findByIdAndUpdate(id, { hod_name, department });
    return NextResponse.json({ message: "HOD Updated" }, { status: 200 })
}


export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const hod = await HeadOfDepartment.findOne({ department: id });
    return NextResponse.json({ hod }, { status: 200 });
} 