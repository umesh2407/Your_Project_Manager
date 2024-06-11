import connectMongoDB from "@/libs/mongodb"
import {Task} from "@/models/Project";
import { NextResponse } from "next/server";


export async function POST(request) {
    const { activity_name, status,timestamp,project } = await request.json();
    await connectMongoDB();
    await Task.create({ activity_name, status,timestamp,project });
    return NextResponse.json({ message: "Task created"}, { status: 201 })
}


export async function GET(){
    await connectMongoDB();
    const tasks = await Task.find();
    return NextResponse.json({tasks});
}

export async function DELETE(request){
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Task.findByIdAndDelete(id);
    return NextResponse.json({message: "Task Deleted"},{status:200});
}

