import { connectDb } from "@/helper/db"
import { getResponseMessage } from "@/helper/responseMessage"
import { User } from "@/models/users"
import { NextResponse } from "next/server"

connectDb()

export const GET = async (req) => {
  try {
    const users = await User.find()
    return NextResponse.json({
      data: users
    })
  } catch (error) {
    return getResponseMessage("Failed to fetch data", 404, false)
  }
}

export const POST = async (req) => {
  try {
    const body = await req.json()
    const createUser = await User.create(body)
    return NextResponse.json({
      status: 201,
      data: createUser,
      success: true
    })
  } catch (error) {
    console.log(error, "error");
    return getResponseMessage("Failed to create user", 500, false)
  }
}