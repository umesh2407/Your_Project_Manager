import connectMongoDB from "@/libs/mongodb"
import { Department } from "@/models/Project";
import { NextResponse } from "next/server";


export async function POST(request) {
    const { department_name, college } = await request.json();
    await connectMongoDB();
    await Department.create({ department_name, college });
    return NextResponse.json({ message: "Department created" }, { status: 201 })
}


export async function GET() {
    await connectMongoDB();
    const departments = await Department.find().populate('college').exec();
    return NextResponse.json({ departments });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Department.findByIdAndDelete(id);
    return NextResponse.json({ message: "Department Deleted" }, { status: 200 });
}

