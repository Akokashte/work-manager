import { getResponseMessage } from "@/helper/responseMessage";
import { Task } from "@/models/task"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken";
import { connectDb } from "@/helper/db";

// get all tasks
export async function GET(request, { params }) {
    try {
        await connectDb();
        const allTasks = await Task.find();

        if (!allTasks) {
            return getResponseMessage(
                400,
                "Error while fetching data !",
                false
            )
        }

        return NextResponse.json(allTasks)

    } catch (error) {
        return getResponseMessage(
            400,
            "Error while fetching data !",
            false
        )
    }
}

// create all the tasks
export async function POST(request, { params }) {
    const { title, content, status } = await request.json()
    try {
        const accessTokenFromCookie = await request.cookies.get("accessToken").value;
        const accessTokenData = await jwt.verify(accessTokenFromCookie, process.env.ACCESS_TOKEN_SECRET);
        console.log("kadka", accessTokenData._id)

        if (!accessTokenData) {
            throw new Error("Invalid token");
        }
        
        await connectDb();
        const task = await Task.create(
            {
                title,
                content,
                status,
                userId: accessTokenData._id
            }
        )

        if (!task) {
            return NextResponse.json({
                message: "failed to create task !!",
                status: 400,
                success: false
            })
        }
        return NextResponse.json({
            message: "Task created successfully !",
            status: 201,
            success: true
        })
    } catch (error) {
        return NextResponse.json({
            message: "failed to create task !!",
            status: 400,
            success: false
        })
    }
}