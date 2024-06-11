import connectMongoDB from "@/libs/mongodb"
import {Student} from "@/models/Project";
import { NextResponse } from "next/server";


export async function POST(request) {
    const { student_name, roll_number, email, mobile_number, project } = await request.json();
    await connectMongoDB();
    await Student.create({ student_name, roll_number, email, mobile_number, project });
    return NextResponse.json({ message: "Student created" }, { status: 201 })
}


export async function GET() {
    await connectMongoDB();
    const students = await Student.find();
    return NextResponse.json({ students });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Student.findByIdAndDelete(id);
    return NextResponse.json({ message: "Student Deleted" }, { status: 200 });
}

