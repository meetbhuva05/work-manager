"use client";

import { httpAxios } from '@/helper/httpAxios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

function Signup() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    profileURL: "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?size=338&ext=jpg&ga=GA1.1.1448711260.1707177600&semt=ais"
  })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form?.name.trim() === "" || form?.name === null) {
      toast.error("userName is required field", { position: "top-center" })
    } else if (form?.email.trim() === "" || form?.email === null) {
      toast.error("Email is required field", { position: "top-center" })
    } else if (form?.password.trim() === "" || form?.password === null) {
      toast.error("Password is required field", { position: "top-center" })
    }

    try {
      const validationCheck = form?.email.trim() && form?.password.trim() && form?.name.trim()
      const result = validationCheck && await httpAxios.post("/api/users", form)
      if (result?.data?.status === 201) {
        toast.success("Signup successfully", { position: "top-center" })
        router.push("/login")
        setForm({
          name: "",
          email: "",
          password: "",
          about: "",
        })
      }
    } catch (error) {
      console.log(error, "error");
      toast.error("Signup Error", { position: "top-center" })
    }
  }
  return (
    <div className='mt-9'>
      <h1 className='text-4xl text-center underline'>Signup Here</h1>
      <div className=" p-5 flex justify-center">
        <div className='mr-4 flex justify-center'>
          <Image src={"/signUp.svg"} alt="" width={0} height={0} style={{ width: "70%" }} />
        </div>
        <form className="w-[30%]" onSubmit={handleSubmit}>
          <div className="mt-3">
            <label className='block text-sm font-medium mb-2'>Username</label>
            <input
              type="text"
              name="name"
              className='w-full p-3 rounded-2xl bg-gray-800 border border-gray-600 outline-none'
              onChange={handleChange}
              value={form.name}
            />
          </div>
          <div className="mt-3">
            <label className='block text-sm font-medium mb-2'>Email</label>
            <input
              type="email"
              name="email"
              className='w-full p-3 rounded-2xl bg-gray-800 border border-gray-600 outline-none'
              onChange={handleChange}
              value={form.email}
            />
          </div>
          <div className="mt-3">
            <label className='block text-sm font-medium mb-2'>Password</label>
            <input
              type="password"
              name="password"
              className='w-full p-3 rounded-2xl bg-gray-800 border border-gray-600 outline-none'
              onChange={handleChange}
              value={form.password}
            />
          </div>
          <div className="mt-3">
            <label className='block text-sm font-medium mb-2'>About</label>
            <textarea
              rows={5}
              name="about"
              onChange={handleChange}
              value={form.about}
              className='w-full p-3 rounded-2xl bg-gray-800 border border-gray-600 outline-none'
            />
          </div>

          <div className="mt-5 flex justify-center gap-3">
            <button type="submit" className='bg-blue-800 py-2 px-3 rounded-lg hover:bg-blue-900'>Signup</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
