import { NextResponse } from "next/server"

export const getResponseMessage=(statusCode,message,successStatus)=>{
    return NextResponse.json({
        status:statusCode,
        message:message,
        success:successStatus,
    })
}