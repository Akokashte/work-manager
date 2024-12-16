import { connectDb } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server"

// get request function
export async function GET() {
    try {
        await connectDb();
        const userData = await User.find();

        return NextResponse.json(userData, {
            status: 200,
            message: "users fetched successfully !"
        })
    } catch (error) {
        return NextResponse.json({
            message: "failed to load users",
            success: false
        })
    }

}


// create user
export async function POST(request) {
    try {
        const { name, email, password, about, profileUrl } = await request.json()
        await connectDb();
        
        // create user object with user model
        const user = await User.create(
            {
                name,
                email,
                password,
                about,
                profileUrl
            }
        )

        const accessToken = await user.generateAccessToken();

        if (!accessToken) {
            throw new Error("Error while generating token !");
        }

        const response = NextResponse.json(user,
            {
                status: 201,
                message: "user created successfully !"
            }
        )

        const cookieOptions = {
            expires: new Date(Date.now() + 86400000),
            httpOnly: true
        }

        response.cookies.set("accessToken", accessToken, cookieOptions);

        return response
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "failed to create user !!",
            success: false
        })
    }

}
