import { User } from "@/models/users"
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"

export const GET = async (req) => {
  const authToken = req.cookies.get("authToken")?.value

  if(!authToken) {
    return NextResponse.json({
      data: "user is not logged in",
      success: false
    })
  }
  const token = jwt.verify(authToken, process.env.JWT_KEY)

  const user = await User.findById({ _id: token._id })

  return NextResponse.json({
    data: user,
    success: true
  })
}