import { connectDb } from "@/helper/db";
import { getResponseMessage } from "@/helper/responseMessage"
import { Task } from "@/models/task"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
    const { taskId } = await params;
    console.log(taskId);

    try {
        await connectDb();
        const task = await Task.findById(taskId)

        if (!task) {
            return getResponseMessage(
                400,
                "failed to get task !",
                false
            )
        }

        return NextResponse.json(task);
    } catch (error) {
        console.log(error)
        return getResponseMessage(
            400,
            "failed to get task !",
            false
        )
    }
}

export async function PATCH(request, { params }) {
    const { taskId } = await params
    const { title, content, status } = await request.json();
    try {
        await connectDb();
        const updatedTask = await Task.findByIdAndUpdate(
            {
                _id: taskId
            },
            {
                title,
                content,
                status
            },
            {
                new: true
            }
        )

        if (!updatedTask) {
            return getResponseMessage(
                400,
                "failed to update task !!",
                false
            )
        }

        return NextResponse.json(
            {
                status: 200,
                updatedTask,
                message: "task updated successfully",
                success: true
            }
        )

    } catch (error) {
        console.log(error)
        return getResponseMessage(
            400,
            "failed to update task !",
            false
        )
    }
}

export async function DELETE(request, { params }) {
    const { taskId } = await params;
    try {
        await connectDb();
        const taskDeleted = await Task.findByIdAndDelete(taskId);

        if (!taskDeleted) {
            return getResponseMessage(
                400,
                "failed to delete task !",
                false
            )
        }

        return getResponseMessage(
            200,
            "task deleted successfully !",
            true
        )
    } catch (error) {
        console.log(error)
        return getResponseMessage(
            400,
            "failed to delete task !",
            false
        )
    }
}