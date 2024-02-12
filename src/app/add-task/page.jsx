"use client";

import React, { useEffect, useState } from 'react'
import loginSvg from "../../assets/login.svg"
import Image from 'next/image'
import { httpAxios } from '@/helper/httpAxios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function AddTask({ searchParams }) {
  const router = useRouter()
  const [task, setTask] = useState({
    title: "",
    content: "",
    status: "",
  })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setTask({ ...task, [name]: value })
  }

  useEffect(() => {
    if (!searchParams?.id) {
      setTask({ title: "", content: "", status: "" })
      return;
    }
    (async () => {
      try {
        const result = await httpAxios.get(`/api/tasks/${searchParams?.id}`)
        if (result?.data?.success) {
          const res = result?.data?.data
          setTask({
            title: res?.title,
            content: res?.content,
            status: res?.status,
          })
        }
      } catch (error) {
        console.log(error, "error");
      }
    })()
  }, [searchParams?.id])

  const handleSubmitTask = async (e) => {
    e.preventDefault()

    try {
      const result = searchParams?.id ? await httpAxios.put(`/api/tasks/${searchParams?.id}`, task) : await httpAxios.post("/api/tasks", task)
      if (result?.data?.status === 201 || result?.data?.success) {
        toast.success(searchParams?.id ? "Your task is updated" : "Your task is added", { position: "top-center" })
        setTask({
          title: "",
          content: "",
          status: "",
        })
        router.push("/show-tasks")
      }
    } catch (error) {
      console.log(error, "error");
      toast.error("Task not added", { position: "top-center" })
    }
  }

  const handleClear = (e) => {
    e.preventDefault()
    setTask({
      title: "",
      content: "",
      status: "",
    })
  }

  return (
    <div className='grid grid-cols-12'>
      <div className="col col-span-4 col-start-5 p-5">
        <div className='my-8 flex justify-center'>
          <Image src={loginSvg} alt="" style={{ width: "50%" }} />
        </div>
        <h1 className='text-3xl text-center'>{searchParams?.id ? "Update" : "Add"} your task here</h1>
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
            <button type="submit" className='bg-blue-800 py-2 px-3 rounded-lg hover:bg-blue-900'>
              {searchParams?.id ? "Update Task" : "Add Task"}
            </button>
            <button type="button" className='bg-red-700 py-2 px-3 rounded-lg hover:bg-red-800' onClick={handleClear} >Clear</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTask
