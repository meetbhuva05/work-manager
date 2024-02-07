import { getResponseMessage } from "@/helper/responseMessage";
import { Tasks } from "@/models/task";
import { NextResponse } from "next/server";

// get single tasks
export const GET = async (req, { params }) => {
  const { taskId } = params;
  try {
    const task = await Tasks.findById({_id: taskId})
    return NextResponse.json({
      data: task,
      success: true
    })
  } catch (error) {
    console.log(error, "error");
    getResponseMessage("Error in fetch data", 404, false)
  }
}

// update tasks
export const PUT = async (req, { params }) => {
  const { taskId } = params;
  try {
    const body = await req.json()
    const updateTask = await Tasks.findByIdAndUpdate({ _id: taskId}, body,{new : true})
    return NextResponse.json({
      data: updateTask,
      success:true
    })
  } catch (error) {
    console.log(error, "error");
    return getResponseMessage("Error in update Task", 500, false)
  }
}

// delete tasks
export const DELETE = async (req, { params }) => {
  const { taskId } = params;
  try {
    await Tasks.findByIdAndDelete({ _id: taskId })
    return NextResponse.json({
      message: "Task Deleted",
      success: true
    })
  } catch (error) {
    console.log(error, "error");
    return getResponseMessage("Error in deleted Task", 500, false)
  }
}