"use server"

import { signIn, signOut } from "@/lib/auth/auth"
import {
  AuthFailureResponse,
  DuplicateResponse,
  NotFoundResponse,
} from "@/constants/apiResponse"
import { connectToDatabase } from "@/database"
import User from "@/database/models/user.model"
import bcrypt from "bcryptjs"

export const register = async (previousState: any, FormData: any) => {
  const { username, email, lastName, firstName, password, photo } = FormData
  try {
    await connectToDatabase()

    const existUser = await User.findOne({ username })
    if (existUser) {
      return { error: DuplicateResponse }
    }

    const salt = await bcrypt.genSalt(0)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({
      username,
      email,
      lastName,
      firstName,
      password: hashedPassword,
      photo,
    })

    await newUser.save()
    return { success: true }
  } catch (error) {
    console.error("Error registering user:", error)
    return { error: "An error occurred while registering user." }
  }
}

export const handelLogin = async (previousState: any, FormData: any) => {
  // await signIn("github")
  const { username, password } = Object.fromEntries(FormData)
  try {
    await signIn("credentials", { username, password })
  } catch (error) {
    console.error("logging Error:", error)

    // @ts-ignore
    if (error.message.includes("CredentialsSignin")) {
      return { error: AuthFailureResponse }
    }
    throw error
  }
}

export const handelLogout = async () => {
  await signOut()
}
