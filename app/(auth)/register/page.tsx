import RegisterForm from "@/components/RegisterForm"
import Link from "next/link"
import React from "react"

const SingUp = () => {
  return (
    <div className="flex flex-col bg-white p-12 gap-5 items-center justify-center shadow-lg rounded-md">
      <h1 className="h1-bold text-primary">signUp</h1>
     <RegisterForm/>
      <div className="flex gap-2">
        <p className="text-gray-500">have account !</p>
        <Link
          className="text-primary underline-offset-4 hover:underline"
          href={"/login"}
        >
          logIn
        </Link>
      </div>
    </div>
  )
}

export default SingUp
