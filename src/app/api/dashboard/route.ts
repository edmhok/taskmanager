import { validateJWTandGetUserId } from "@/helpers/jwtValidation";
import Task from "@/models/taskModel";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request : NextRequest) {
    try {
        const userId = await validateJWTandGetUserId(request);
        const tasks = await Task.find({ user: userId});
        let resultData = {
            // status level
            totalTasks : tasks.length,
            inProgressTasks : tasks.filter((task) => task.status === 'in-progress').length,
            completedTasks : tasks.filter((task) => task.status === 'completed').length,
            openTasks : tasks.filter((task) => task.status === 'open').length,

            // priority level
            highPriorityTasks : tasks.filter((task) => task.priority === 'high').length,
            mediumPriorityTasks : tasks.filter((task) => task.priority === 'medium').length,
            lowPriorityTasks : tasks.filter((task) => task.priority === 'low').length,
        }
        return NextResponse.json({
            data: resultData,
        },
        {
            status: 200
        })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 401 });
    }
}