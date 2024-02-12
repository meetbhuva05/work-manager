"use client";

import UserContext from '@/app/context/userContext';
import { httpAxios } from '@/helper/httpAxios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import { toast } from 'react-toastify';

function Navbar() {
  const context = useContext(UserContext)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const res = await httpAxios.post("/api/logout")
      if (res?.data?.status === 200) {
        toast.success(res?.data?.message, { position: "top-center" })
        router.push("/login")
        context.setUser("")
      }
    } catch (error) {
      console.log(error, "error");
      toast.error("Logout Error")
    }
  }
  return (
    <div className='bg-blue-800 h-16 py-2 px-36 flex justify-between items-center'>
      <div className='brand'>
        <h1><Link href="/" className='text-2xl font-semibold'>Work Manager</Link></h1>
      </div>
      <div>
        <ul className='flex space-x-5'>
          {
            context?.user && (
              <>
                <li><Link href="/" className='hover:text-blue-200'>Home</Link></li>
                <li><Link href="/add-task" className='hover:text-blue-200'>Add Task</Link></li>
                <li><Link href="/show-tasks" className='hover:text-blue-200'>Show Tasks</Link></li>
              </>
            )
          }
        </ul>
      </div>

      {
        context.user && (
          <>
            <div>
              <ul className='flex space-x-5'>
                <li><Link href="/" className='hover:text-blue-200'>{context?.user?.name}</Link></li>
                <li><button className='hover:text-blue-200' onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          </>
        )
      }


      {
        !context.user && (
          <>
            <div>
              <ul className='flex space-x-5'>
                <li><Link href="/login" className='hover:text-blue-200'>Login</Link></li>
                <li><Link href="/signup" className='hover:text-blue-200'>Signup</Link></li>
              </ul>
            </div>
          </>
        )
      }
    </div >
  )
}

export default Navbar
