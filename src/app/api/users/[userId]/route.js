import { User } from "@/models/users";
import { NextResponse } from "next/server";

// get single task
export const GET = async (req, { params }) => {
  const { userId } = params;

  try {
    const singleUser = await User.findById({ _id: userId })
    return NextResponse.json({
      data: singleUser,
      success:true
    })
  } catch (error) {
    console.log(error, "error");
    getResponseMessage("Error in fetch data", 404, false)
  }
}

// update task
export const PUT = async (req, { params }) => {
  const { userId } = params;

  try {
    const body = await req.json()
    const updateUser = await User.findByIdAndUpdate({ _id: userId}, body,{new : true})

    return NextResponse.json({
      data: updateUser,
      success:true
    })
  } catch (error) {
    console.log(error, "error");
    getResponseMessage("Error in update User", 500, false)
  }
}

// delete task
export const DELETE = async (req, { params }) => {
  const { userId } = params;

  try {
    await User.findByIdAndDelete({ _id: userId })

    return NextResponse.json({
      message: "User Deleted",
      success: true
    })
  } catch (error) {
    console.log(error, "error");
    getResponseMessage("Error in deleted User", 500, false)
  }
}
