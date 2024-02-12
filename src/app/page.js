"use client";

import { httpAxios } from "@/helper/httpAxios";
import { useContext, useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import UserContext from "./context/userContext";

export default function Home() {
  const context = useContext(UserContext)
  const [allTasks, setAllTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!context?.user) return;
    (async () => {
      try {
        setLoading(true)
        const res = await httpAxios.get(`/api/tasks`);
        setAllTasks(res?.data?.data?.reverse() || [])
        setLoading(false)
      } catch (error) {
        console.log(error, "error");
      }
    })()
  }, [context?.user])

  return (
    <div className="grid grid-cols-12  mt-3 min-h-[71vh]">
      <div className='col-span-6 col-start-4'>
        <h1 className='text-3xl mb-3'>All Tasks ( {allTasks?.length} )</h1>
        {
          loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="rounded-full border-t-8 border-b-8 border-blue-600 h-16 w-16 animate-spin"></div>
            </div>
          ) : (
            allTasks?.length > 0 ? (
              allTasks?.map((elem, index) => {
                return (
                  <div className={`${elem?.status === "completed" ? "bg-green-600" : "bg-red-600 bg-opacity-40"} shadow-lg mt-3 rounded-md`} key={index}>
                    <div className='p-5'>
                      <h1 className='text-2xl font-semibold'>{elem?.title}</h1>
                      <p className='font-normal'>{elem?.content}</p>
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
  );
}
