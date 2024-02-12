import { NextResponse } from "next/server"

export const POST = (req) => {
  const response = NextResponse.json({
    message: "Logged Out Successfully",
    success: true,
    status: 200
  })

  response.cookies.set("authToken", "", {
    expires: new Date(0)
  })

  return response
}