import connectMongoDB from "@/libs/mongodb"
import { Notification } from "@/models/Project";
import { NextResponse } from "next/server";


export async function POST(request) {
    const { notification_content, timestamp } = await request.json();
    await connectMongoDB();
    await Notification.create({ notification_content, timestamp });
    return NextResponse.json({ message: "Notification created" }, { status: 201 })
}


export async function GET() {
    await connectMongoDB();
    const notifications = await Notification.find();
    return NextResponse.json({ notifications });
}



