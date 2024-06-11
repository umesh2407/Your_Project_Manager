import connectMongoDB from "@/libs/mongodb"
import {HeadOfDepartment} from "@/models/Project";
import { NextResponse } from "next/server";


export async function POST(request) {
    const { hod_name, department } = await request.json();
    await connectMongoDB();
    await HeadOfDepartment.create({ hod_name, department });
    return NextResponse.json({ message: "HOD created" }, { status: 201 })
}


export async function GET() {
    await connectMongoDB();
    const hods = await HeadOfDepartment.find();
    return NextResponse.json({ hods });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await HeadOfDepartment.findByIdAndDelete(id);
    return NextResponse.json({ message: "HOD Deleted" }, { status: 200 });
}

