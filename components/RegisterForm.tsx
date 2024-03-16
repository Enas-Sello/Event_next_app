"use client"
import { Button } from "@/components/ui/button"
import { register } from "@/lib/actions/auth.action"
import { useFormState } from "react-dom"
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RegisterFormSchema } from "@/lib/validation"

import { useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import { useUploadThing } from "@/lib/uploadthing"
import { useRouter } from "next/navigation"
import FileUploader from "./shared/FileUploader"

const RegisterForm = () => {
  const router = useRouter()
  const [state, formAction] = useFormState(register, undefined)
  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    state?.success && router.push("/login")
  }, [state?.success, router])

  const { startUpload } = useUploadThing("imageUploader")
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      isAdmin: false,
      password: "",
      photo: "",
    },
  })
  async function onSubmit(values: z.infer<typeof RegisterFormSchema>) {
    let uploadedImageUrl = values.photo
    if (files.length > 0) {
      const uploadedImages = await startUpload(files)

      if (!uploadedImages) {
        throw new Error("error with uploadedImages")
      }
      uploadedImageUrl = uploadedImages[0].url
    }
    try {
      formAction(values)
    } catch (error) {
      console.log({ error: "error at create event" + error })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 "
      >
        <div className="grid grid-cols-2 gap-7">
          <div className="flex flex-col gap-5 md:flex-row col-span-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>User name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="User Name"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="******"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex  flex-col gap-5 md:flex-row col-span-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>first name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First Name"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Last Name"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex  flex-col gap-5 md:flex-row col-span-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@test.com"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex  flex-col gap-5 md:flex-row col-span-2">
            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-28  w-full">
                    <FileUploader
                      onFieldChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button
          type="submit"
          className=" w-full text-lg "
          size={"lg"}
          disabled={form.formState.isSubmitting}
        >
          signUp
        </Button>
        <p className=" text-red-500 text-xl">{state?.error}</p>
      </form>
    </Form>
  )
}

export default RegisterForm
