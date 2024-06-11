import connectMongoDB from "@/libs/mongodb"
import {ProjectCoordinator} from "@/models/Project";
import { NextResponse } from "next/server";


export async function POST(request) {
    const { coordinator_name, department } = await request.json();
    await connectMongoDB();
    await ProjectCoordinator.create({ coordinator_name, department });
    return NextResponse.json({ message: "Project Coordinator created"}, { status: 201 })
}


export async function GET(){
    await connectMongoDB();
    const cords = await ProjectCoordinator.find();
    return NextResponse.json({cords});
}

export async function DELETE(request){
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await ProjectCoordinator.findByIdAndDelete(id);
    return NextResponse.json({message: "Project Coordinator Deleted"},{status:200});
}

