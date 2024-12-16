import { connectDb } from "@/helper/db";
import { User } from "@/models/user";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(request) {
    const accessToken = request.cookies.get("accessToken")?.value;

    if (!accessToken) {
        return NextResponse.json(({
            message: "user is not logged in !"
        }))
    }
    const { _id } = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    await connectDb();
    const user = await User.findById(_id);
    return NextResponse.json({ user });
}