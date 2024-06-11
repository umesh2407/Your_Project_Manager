import connectMongoDB from "@/libs/mongodb";
import {College} from "@/models/Project";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newCollegeName: college_name } = await request.json();
    await connectMongoDB();
    await College.findByIdAndUpdate(id, { college_name });
    return NextResponse.json({ message: "College Updated" }, { status: 200 })
}


export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const colleges = await College.findOne({ _id: id });
    return NextResponse.json({ colleges }, { status: 200 });
} 