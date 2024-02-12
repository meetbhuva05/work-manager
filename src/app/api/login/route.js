import { getResponseMessage } from "@/helper/responseMessage"
import { User } from "@/models/users"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const POST = async (req) => {
  try {
    const { email, password } = await req.json()
    const user = await User.findOne({ email: email })
    if (!user) {
      throw new Error("Invalid login Credentials")
    }

    const hashPassword = await bcrypt.compare(password, user.password)
    if (!hashPassword) {
      throw new Error("Invalid login Credentials")
    }

    const token = jwt.sign({ _id: user._id, name: user.name }, process.env.JWT_KEY)

    const response = NextResponse.json({
      status: 201,
      data: user,
      success: true
    })
    response.cookies.set("authToken", token, {
      expiresIn: "1d",
      httpOnly: true
    })
    return response
  } catch (error) {
    return getResponseMessage(error.message, 500, false)
  }
}