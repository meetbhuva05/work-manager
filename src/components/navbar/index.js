"use client";

import Link from 'next/link';
import React from 'react'

function Navbar() {
  return (
    <div className='bg-blue-800 h-16 py-2 px-36 flex justify-between items-center'>
     <div className='brand'>
      <h1><Link href="/" className='text-2xl font-semibold'>Work Manager</Link></h1>
     </div>
     <div>
      <ul className='flex space-x-5'>
        <li><Link href="/" className='hover:text-blue-200'>Home</Link></li>
        <li><Link href="/add-task" className='hover:text-blue-200'>Add Task</Link></li>
        <li><Link href="/show-tasks" className='hover:text-blue-200'>Show Tasks</Link></li>
      </ul>
     </div>
     <div>
     <ul className='flex space-x-5'>
        <li><Link href="/" className='hover:text-blue-200'>Login</Link></li>
        <li><Link href="/" className='hover:text-blue-200'>Signup</Link></li>
      </ul>
     </div>
    </div>
  )
}

export default Navbar
