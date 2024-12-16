import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request, {params}){
     const response = NextResponse.json({
        message:"logged out successfully !",
        success:true
     })

     response.cookies.set("accessToken","",{expires:new Date(0)});

     return response;
}