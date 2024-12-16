import { connectDb } from "@/helper/db";
import { User } from "@/models/user";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(request){
    const accessToken = request.cookies.get("accessToken")?.value;

    const {_id} = await jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
    
    await connectDb();
    const user = await User.findById(_id);
    return NextResponse.json({user});
}