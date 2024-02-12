"use client";

import { httpAxios } from '@/helper/httpAxios';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import UserContext from '../context/userContext';

function Login() {
  const router = useRouter()
  const context = useContext(UserContext)
  
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (user?.email.trim() === "" || user?.email === null) {
      toast.error("Email is required field", { position: "top-center" })
    } else if (user?.password.trim() === "" || user?.password === null) {
      toast.error("Password is required field", { position: "top-center" })
    }

    try {
      const validationCheck = user?.email.trim() && user?.password.trim()
      const result = validationCheck && await httpAxios.post("/api/login", user)
      if (result?.data?.status === 201) {
        toast.success("Login successfully", { position: "top-center" })
        context.setUser(result?.data?.data)
        router.push("/")
        setUser({
          email: "",
          password: "",
        })
      }
    } catch (error) {
      console.log(error, "error");
      toast.error(error?.response?.data?.message || "Error in Login", { position: "top-center" })
    }
  }
  return (
    <div className='h-[71.2vh] flex items-center justify-center'>
      <div className="w-[30%]">
        <h1 className='text-3xl text-center underline'>Login Here</h1>

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className='block text-sm font-medium mb-2'>Email</label>
            <input
              type="email"
              name="email"
              className='w-full p-3 rounded-3xl bg-gray-800 border border-gray-600 outline-none'
              onChange={handleChange}
              value={user.email}
            />
          </div>
          <div className="mt-4">
            <label className='block text-sm font-medium mb-2'>Password</label>
            <input
              type="password"
              name="password"
              className='w-full p-3 rounded-3xl bg-gray-800 border border-gray-600 outline-none'
              onChange={handleChange}
              value={user.password}
            />
          </div>

          <div className="mt-5 flex justify-center gap-3">
            <button className='bg-blue-800 py-2 px-3 rounded-lg hover:bg-blue-900'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
