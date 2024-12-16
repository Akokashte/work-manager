import { connectDb } from "@/helper/db";
import { getResponseMessage } from "@/helper/responseMessage";
import { User } from "@/models/user"
import { NextResponse } from "next/server";


export async function POST(request, { params }) {
    const { email, password } = await request.json();
    try {
        await connectDb();
        const userExist = await User.findOne({ email });

        if (!userExist) {
            throw new Error("user not found !!")
        }

        const passwordMatches = await userExist.comparePassword(password);

        if (!passwordMatches) {
            return getResponseMessage(
                401,
                "Invalid credentials failed to login",
                false
            )
        }

        const accessToken = await userExist.generateAccessToken();

        if (!accessToken) {
            throw new Error("Error while generating token !");
        }

        const response = NextResponse.json({
            statusCode: 200,
            message: "logged in successfully !",
            success: true
        })

        const cookieOptions = {
            httpOnly: true,
            expires: new Date(Date.now() + 86400000),
        }
        response.cookies.set("accessToken", accessToken, cookieOptions);

        return response;
    } catch (error) {
        console.log(error);
        return getResponseMessage(
            error.statusCode,
            error.message,
            false
        )
    }
}