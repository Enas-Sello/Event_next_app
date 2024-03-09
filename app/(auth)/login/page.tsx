import LoginForm from "@/components/LoginForm"

import React from "react"

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white p-12 gap-10">
      <h1 className="h1-bold text-primary">logIn</h1>
      <LoginForm />
    </div>
  )
}

export default Login
