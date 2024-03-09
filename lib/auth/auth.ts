import { authConfig } from "./auth.config"
import User from "@/database/models/user.model"
import NextAuth from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "@/database"
import { NotFoundResponse, AuthFailureResponse } from "@/constants/apiResponse"

const login = async (credential: any) => {
  try {
    await connectToDatabase()
    const user = await User.findOne({ username: credential.username })
    if (!user) {
      throw new Error(NotFoundResponse)
    }
    const isPassWordCorrect = await bcrypt.compare(
      credential.password,
      user.password
    )
    if (!isPassWordCorrect) {
      throw new Error(AuthFailureResponse)
    }
    return user
  } catch (err) {
    console.log("err", err)
    throw new Error("failed to login ")
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials)
          return user
        } catch (err) {
          console.log(err)
          return null
        }
      },
    }),
  ],
  
  // @ts-ignore
  callbacks: {
    ...authConfig.callbacks,
  },
})
