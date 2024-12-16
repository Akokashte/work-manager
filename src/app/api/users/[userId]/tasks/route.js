import { connectDb } from "@/helper/db";
import { getResponseMessage } from "@/helper/responseMessage";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        await connectDb()
        const {userId} = await params;
        const userTasks = await Task.find({userId});

        if (!userTasks) {
            console.log("hi");
            return getResponseMessage(
                400,
                "failed to load tasks !!",
                false
            )
        }

        return NextResponse.json({
            statusCode: 200,
            userTasks,
            message: "Tasks fetched successfully !"
        })

    } catch (error) {
        return getResponseMessage(
            404,
            "failed to load tasks !!",
            false
        )
    }
}