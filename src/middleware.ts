import { NextRequest, NextResponse } from "next/server";


export async function middleware(request : NextRequest){
    try {
        const publicRoute = 
          request.nextUrl.pathname === "/login" ||
          request.nextUrl.pathname === "/register";

        const token = request.cookies.get("token")?.value;
        // console.log(token);

        // if the token is present and the route is public, redirect to the homepage
        if (token && publicRoute) {
            return NextResponse.redirect(new URL("/", request.url));
        }

        //if the token is not present and the route is private, redirect to the login page
        if (!token && !publicRoute) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        return NextResponse.next()
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

// "Matching Paths" 
export const config = {
    matcher: ['/login','/register','/', '/client_home']
}