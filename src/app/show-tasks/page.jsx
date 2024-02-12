"use client";

import { httpAxios } from '@/helper/httpAxios';
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/userContext';
import { IoCloseCircle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function ShowTasks() {
  const context = useContext(UserContext)
  const router = useRouter()

  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!context?.user) return;
    (async () => {
      try {
        setLoading(true)
        const res = await httpAxios.get(`/api/users/${context?.user?._id}/tasks`);
        setTasks(res?.data?.data?.reverse() || [])
        setLoading(false)
      } catch (error) {
        console.log(error, "error");
      }
    })()
  }, [context?.user])

  const handleDelete = async (taskId) => {
    try {
      const res = await httpAxios.delete(`/api/tasks/${taskId}`)
      if (res?.data?.success) {
        toast.success("Task Deleted Successfully", { position: "top-center" })
        const newTask = tasks.filter((elem) => elem?._id !== taskId)
        setTasks(newTask)
      }
    } catch (error) {
      console.log(error, "error");
      toast.success("Error Deleted Task", { position: "top-center" })
    }
  }

  const handleUpdateClick = (data) => {
    router.push(`/add-task?id=${data?._id}`,)
  }

  return (
    <div className="grid grid-cols-12  mt-3 min-h-[71vh]">
      <div className='col-span-6 col-start-4'>
        <h1 className='text-3xl mb-3'>Your Tasks ( {tasks?.length} )</h1>
        {
          loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="rounded-full border-t-8 border-b-8 border-blue-600 h-16 w-16 animate-spin"></div>
            </div>
          ) : (
            tasks?.length > 0 ? (
              tasks?.map((elem, index) => {
                return (
                  <div className={`${elem?.status === "completed" ? "bg-green-600" : "bg-red-600 bg-opacity-40"} shadow-lg mt-3 rounded-md`} key={index}>
                    <div className='p-5'>
                      <div className="flex justify-between">
                        <h1 className='text-2xl font-semibold'>{elem?.title}</h1>
                        <MdDelete className=" text-[24px] cursor-pointer text-red-700  " onClick={() => handleDelete(elem?._id)} />
                      </div>
                      <div className="flex justify-between">
                        <p className='font-normal'>{elem?.content}</p>
                        {
                          elem?.status === "pending" && <FaEdit className="text-green-800 text-[20px] cursor-pointer" onClick={() => handleUpdateClick(elem)} />
                        }
                      </div>
                      <div className="flex justify-between mt-3">
                        <p className='text-left'>Status : <span className="font-bold">{elem?.status}</span></p>
                        <p className="text-right">Author : <span className="font-bold">{elem?.auther}</span></p>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="flex justify-center items-center h-full text-[24px]">
                Not Found
              </div>
            )
          )
        }

      </div>
    </div>
  )
}

export default ShowTasks
