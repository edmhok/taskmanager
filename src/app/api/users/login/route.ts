import { connectMongoDB } from '@/config/dbConfig'
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectMongoDB();

export async function POST(request: NextRequest) {
    try {
        //check if user exists in db
        const reqBody = await request.json();
        const userExists = await User.findOne({ email: reqBody.email });
        if (!userExists) {
            throw new Error("User does not exists");
        }

        //check if password is correct
        const passwordIsMatched = await bcrypt.compare(
            reqBody.password,
            userExists.password
        );
        if (!passwordIsMatched) {
            throw new Error('Invalid Credentials');
        }

        // create a jwt token
        const token = jwt.sign(
            { userId: userExists._id },
            process.env.jwt_secret!,
            { expiresIn: "7d" }
        );

        const response = NextResponse.json(
            {
                message: "User logged in successfully",
            },
            { status: 200 }
        );

        //attach token to response cookies
        response.cookies.set("token", token, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7days
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }


}
