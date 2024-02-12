"use client";

import { httpAxios } from '@/helper/httpAxios';
import React, { useEffect, useState } from 'react'
import UserContext from './userContext'

const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const getUser = await httpAxios.get("/api/current");
        setUser(getUser?.data?.data || "")
      } catch (error) {
        console.log(error, "error");
      }
    })()
  }, [])
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
