"use client"
import { Button } from "@/components/ui/button"
import { register } from "@/lib/actions/auth.action"
import { useFormState } from "react-dom"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

const RegisterForm = () => {
  const [state, formAction] = useFormState(register, undefined)
  const router = useRouter()
  useEffect(() => {
    state?.success && router.push("/login")
  }, [state?.success, router])
  return (
    <form action={formAction}>
      <div className="  grid grid-cols-2 gap-7 ">
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
        <div className=" flex flex-col w-full gap-4">
          <label className="text-gray-500 " htmlFor="email">
            e-mail
          </label>
          <input
            className="w-full p-4 bg-primary-50  border-none rounded-sm"
            type="text"
            placeholder="email"
            name="email"
          />
        </div>
        <div className=" flex flex-col w-full gap-4">
          <label className="text-gray-500 " htmlFor="firstName">
            first name
          </label>
          <input
            className="w-full p-4 bg-primary-50  border-none rounded-sm"
            type="text"
            placeholder="first name"
            name="firstName"
          />
        </div>
        <div className=" flex flex-col w-full gap-4">
          <label className="text-gray-500 " htmlFor="lastName">
            last name
          </label>
          <input
            className="w-full p-4 bg-primary-50  border-none rounded-sm"
            type="text"
            placeholder="last name"
            name="lastName"
          />
        </div>
        {/* <div className=" flex flex-col w-full gap-4">
          <label className="text-gray-500 " htmlFor="lastName">
            lastName
          </label>
          <input
          className="w-full p-4 bg-primary-50  border-none rounded-sm"
          type="text"
          placeholder="lastName"
          name="lastName"
          />
        </div> */}

        {/* <input type="text" placeholder="photo" name="photo" /> */}
      </div>
      <Button type="submit" className="w-full font- text-xl mt-5" size={"lg"}>
        signUp
      </Button>

      <p className=" text-red-500 text-xl">{state?.error}</p>
    </form>
  )
}

export default RegisterForm
