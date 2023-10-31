import { connectMongoDB } from "@/config/dbConfig"
import { validateJWTandGetUserId } from "@/helpers/jwtValidation";
import Task from "@/models/taskModel";
import { NextRequest, NextResponse } from "next/server";


connectMongoDB();

export async function GET(request: NextRequest, {params} : {params : {taskid : string}}) {
    try {
        const userId = await validateJWTandGetUserId(request);
        const task = await Task.findOne({ user: userId , _id: params.taskid });
        return NextResponse.json(
            { data: task },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
        
    }
}

export async function PUT(request: NextRequest, 
    { params } : { params : { taskid : string }}
    ) {
    try {
        const userId = await validateJWTandGetUserId(request);
        const reqBody = await request.json();
        const task = await Task.findOneAndUpdate({ user: userId , _id: params.taskid },
            reqBody
            );
            return NextResponse.json(
            { data: task },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
        
    }
}