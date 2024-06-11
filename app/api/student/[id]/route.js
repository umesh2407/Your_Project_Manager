import connectMongoDB from "@/libs/mongodb";
import {Student} from "@/models/Project";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newStudent: student_name, newRoll: roll_number, newEmail: email, newMobile: mobile_number, newProject: project } = await request.json();
    await connectMongoDB();
    await Student.findByIdAndUpdate(id, { student_name, roll_number, email, mobile_number, project });
    return NextResponse.json({ message: "Student Updated" }, { status: 200 })
}


export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const student = await Student.findOne({ _id: id });
    return NextResponse.json({ student }, { status: 200 });
} 