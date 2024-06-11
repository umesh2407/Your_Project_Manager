import connectMongoDB from "@/libs/mongodb"
import { College } from "@/models/Project";
import { NextResponse } from "next/server";


export async function POST(request) {
    const { college_name } = await request.json();
    await connectMongoDB();
    await College.create({ college_name });
    return NextResponse.json({ message: "College created" }, { status: 201 })
}


export async function GET() {
    await connectMongoDB();
    const colleges = await College.find();
    return NextResponse.json({ colleges });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await College.findByIdAndDelete(id);
    return NextResponse.json({ message: "College Deleted" }, { status: 200 });
}

