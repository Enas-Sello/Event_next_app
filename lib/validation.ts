import { z } from "zod"

export const EventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(400, "Description must be less than 400 characters"),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(400, "Location must be less than 400 characters"),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
})
export const RegisterFormSchema = z.object({
  username: z.string().min(3, "user name must be at least 3 characters"),
  password: z
    .string()
    .min(3, "Password must be at least 4  characters")
    .max(8, "Password must be less than 8 characters"),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  photo: z.string(),

  isAdmin: z.boolean(),
})
