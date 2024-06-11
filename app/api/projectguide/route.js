import connectMongoDB from "@/libs/mongodb"
import {ProjectGuide} from "@/models/Project";
import { NextResponse } from "next/server";


export async function POST(request) {
    const { guide_name, department } = await request.json();
    await connectMongoDB();
    await ProjectGuide.create({ guide_name, department });
    return NextResponse.json({ message: "Project Guide created" }, { status: 201 })
}


export async function GET() {
    await connectMongoDB();
    const guides = await ProjectGuide.find();
    return NextResponse.json({ guides });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await ProjectGuide.findByIdAndDelete(id);
    return NextResponse.json({ message: "Project Guide Deleted" }, { status: 200 });
}

