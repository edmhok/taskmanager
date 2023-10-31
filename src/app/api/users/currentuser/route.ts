import { connectMongoDB } from "@/config/dbConfig";
import { validateJWTandGetUserId } from "@/helpers/jwtValidation";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectMongoDB();

export async function GET(request: NextRequest) {
    try {
        const userId = await validateJWTandGetUserId(request);
        const user = await User.findById(userId).select("-password");
        
        if (!user) throw new Error('No such user found');
        return NextResponse.json({ data: user }, { status: 200 });
        
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500});
    }
}