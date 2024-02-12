import { getResponseMessage } from "@/helper/responseMessage"
import { Tasks } from "@/models/task"
import { User } from "@/models/users"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// get all tasks
export const GET = async (req) => {
  try {
    const tasks = await Tasks.find()
    return NextResponse.json({
      data: tasks
    })
  } catch (error) {
    console.log(error);
    getResponseMessage("Error in fetch data", 404, false)
  }
}

// create tasks
export const POST = async (req) => {
  const authToken = req.cookies.get("authToken")?.value

  try {
    const token = jwt.verify(authToken, process.env.JWT_KEY)
    const user = await User.findById({ _id: token._id })
    const body = await req.json()
    const createTask = await Tasks.create({ ...body, userId: user?._id, auther:user?.name  })

    return NextResponse.json({
      status: 201,
      data: createTask,
      success: true
    })
  } catch (error) {
    console.log(error, "error");
    return getResponseMessage("Failed to create task", 500, false)
  }
}