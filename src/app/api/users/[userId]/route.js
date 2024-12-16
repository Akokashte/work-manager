import { connectDb } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

// get user by id
export async function GET(request, { params }) {
    try {
        const { userId } = await params;
        console.log(userId)
        await connectDb();
        const user = await User.findById(userId).select("-password");
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({
            message: "failed to get user",
            statusCode: 400
        })
    }

}

// delete user
export async function DELETE(request, { params }) {
    const { userId } = await params;
    try {
        console.log(userId)

        await connectDb();
        const res = await User.deleteOne({ _id: userId })
        console.log(res)

        if (res.deletedCount === 0) {
            return NextResponse.json(
                {
                    message: "failed to delete user",
                    success: false
                }
            );
        }

        return NextResponse.json(
            {
                message: "user deleted successfully",
                success: true,
            }
        );

    } catch (error) {
        return NextResponse.json(
            {
                message: "failed to delete user",
                success: false
            }
        );
    }
}


// update user data in db

export async function PUT(request, { params }) {
    const { userId } = await params;
    const { name, email, password, about, profileUrl } = await request.json()
    console.log(name, email, password, about, profileUrl)
    console.log(userId)

    try {
        await connectDb();
        const user = await User.findById(userId)
        user.name = name;
        user.password = password;
        user.about = about;
        user.profileUrl = profileUrl;

        const updatedUser = await user.save()

        if(!updatedUser){
            return NextResponse.json({
                message:"error while updating data !",
                success:false
            })
        }

        return NextResponse.json(updatedUser)

    } catch (error) {
        return NextResponse.json({
            message: "failed to update user data",
            success: false
        })
    }
}