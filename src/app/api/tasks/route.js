import { getResponseMessage } from "@/helper/responseMessage"
import { Tasks } from "@/models/task"
import { NextResponse } from "next/server"

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
  try {
    const body = await req.json()
    const createTask = await Tasks.create(body)

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