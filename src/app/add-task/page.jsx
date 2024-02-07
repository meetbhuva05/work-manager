"use client";

import React, { useState } from 'react'
import loginSvg from "../../assets/login.svg"
import Image from 'next/image'
import { httpAxios } from '@/helper/httpAxios';
import { toast } from 'react-toastify';

function AddTask() {
  const [task, setTask] = useState({
    title: "",
    content: "",
    status: "",
    userId: "65c31f91cddc0e67d93e692c"
  })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setTask({ ...task, [name]: value })
  }

  const handleSubmitTask = async (e) => {
    e.preventDefault()

    try {
      const result = await httpAxios.post("/api/tasks", task)
      if(result?.data?.status === 201) {
        toast.success("Your task is added", {position:"top-center"})
        setTask({
          title: "",
          content: "",
          status: "",
        })
      }
      console.log(result, "result");
    } catch (error) {
      console.log(error, "error");
      toast.success("Task not added", {position:"top-center"})

    }
  }

  return (
    <div className='grid grid-cols-12'>
      <div className="col col-span-4 col-start-5 p-5">
        <div className='my-8 flex justify-center'>
          <Image src={loginSvg} alt="" style={{ width: "50%" }} />
        </div>
        <h1 className='text-3xl text-center'>Add your task here</h1>

        <form onSubmit={handleSubmitTask}>
          <div className="mt-4">
            <label className='block text-sm font-medium mb-2'>Title</label>
            <input
              type="text"
              name="title"
              className='w-full p-3 rounded-3xl bg-gray-800 border border-gray-600 outline-none'
              onChange={handleChange}
              value={task.title}
            />
          </div>

          <div className="mt-4">
            <label className='block text-sm font-medium mb-2'>Content</label>
            <textarea
              rows={5}
              name="content"
              onChange={handleChange}
              value={task.content}
              className='w-full p-3 rounded-3xl bg-gray-800 border border-gray-600 outline-none'
            />
          </div>

          <div className="mt-4">
            <label className='block text-sm font-medium mb-2'>Status</label>
            <select
              name='status'
              onChange={handleChange}
              className='w-full p-3 rounded-3xl bg-gray-800 border border-gray-600 outline-none'
              defaultValue={""}
              value={task.status}
            >
              <option value="" disabled>-- Select Status --</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="mt-5 flex justify-center gap-3">
            <button className='bg-blue-800 py-2 px-3 rounded-lg hover:bg-blue-900'>Add Todo</button>
            <button className='bg-red-700 py-2 px-3 rounded-lg hover:bg-red-800'>Clear</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTask
