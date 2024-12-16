import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const accessToken = request.cookies.get("accessToken")?.value;

    if (request.nextUrl.pathname === "/api/login" || request.nextUrl.pathname === "/api/users") {
        return
    }

    const loggedInUserNotAccessPath = request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup";

    if (loggedInUserNotAccessPath) {
        // accesing not secured route
        if (accessToken) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }
    // accessing secured route
    else if (!accessToken) {
        if (request.nextUrl.pathname.startsWith("/api")) {
            return NextResponse.json(
                {
                    message: "Access Denied !!",
                    success: false,
                    status: 401
                }
            )
        }

        return NextResponse.redirect(new URL("/login", request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/",
        "/login",
        "/signup",
        "/show-tasks",
        "/add-task",
        "/profile/:path*",
        "/api/:path*"
    ],
}