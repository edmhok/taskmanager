import { connectMongoDB } from "@/config/dbConfig"
import { validateJWTandGetUserId } from "@/helpers/jwtValidation";
import Task from "@/models/taskModel";
import { NextRequest, NextResponse } from "next/server";


connectMongoDB();

export async function POST(request: NextRequest) {
    try {
        const userId = await validateJWTandGetUserId(request);
        const reqBody = await request.json();
        reqBody.user = userId;
        await Task.create(reqBody);
        return NextResponse.json(
            { message: "Task created successfully"},
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({error: error.message}, { status: 500});
        
    }
}

export async function GET(request: NextRequest) {
    try {
        const userId = await validateJWTandGetUserId(request);
        const tasks = await Task.find({ user: userId }).sort({ createdAt: -1});
        return NextResponse.json(
            { data: tasks },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({error: error.message}, { status: 500});
        
    }
}