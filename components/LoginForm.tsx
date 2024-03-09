"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { handelLogin } from "@/lib/actions/auth.action"
import { useFormState } from "react-dom"
import { useEffect } from "react"

const LoginForm = () => {
  const [state, formAction] = useFormState(handelLogin, undefined)

  useEffect(() => {}, [])
  return (
    <form
      className="w-[500px]  flex flex-col items-center gap-7 rounded-md"
      action={formAction}
    >
      <div className=" flex flex-col w-full gap-4">
        <label className="text-gray-500 " htmlFor="username">
          user name
        </label>
        <input
          className="w-full p-4 bg-primary-50  border-none rounded-sm"
          type="text"
          placeholder="username"
          name="username"
        />
      </div>
      <div className=" flex flex-col w-full gap-4">
        <label className="text-gray-500 " htmlFor="password">
          password
        </label>
        <input
          className="w-full p-4 bg-primary-50  border-none rounded-sm"
          type="password"
          placeholder="password"
          name="password"
        />
      </div>
      <Button className="w-full font- text-xl" size={"lg"}>
        logIn
      </Button>
      <p className=" text-red-500 text-xl">{state?.error}</p>
      <div className="flex gap-2">
        <p className="text-gray-500">don't have account ?</p>
        <Link
          className="text-primary underline-offset-4 hover:underline"
          href={"/register"}
        >
          register
        </Link>
      </div>
    </form>
  )
}

export default LoginForm
