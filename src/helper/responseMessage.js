import { NextResponse } from "next/server"

export const getResponseMessage = async (message, statusCode, successStatus) => {
  return NextResponse.json({
    message: message,
    success: successStatus,
    statusCode: statusCode
  },{
    status: statusCode
  })

}