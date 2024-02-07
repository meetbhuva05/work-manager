import { getResponseMessage } from "@/helper/responseMessage";
import { Tasks } from "@/models/task";
import { NextResponse } from "next/server";

// get user tasks
export const GET = async (req, { params }) => {
  const { userId } = params
  try {
    const tasks = await Tasks.find({ userId: userId })
    return NextResponse.json({
      data: tasks
    })
  } catch (error) {
    console.log(error);
    getResponseMessage("Error in fetch data", 404, false)

  }
}