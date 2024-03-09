"use server"

import { CreateCategoryParams } from "@/types/index"
import { handleError } from "../utils"
import { connectToDatabase } from "@/database"
import Category from "@/database/models/category.model"

export const createCategory = async ({
  categoryName,
}: CreateCategoryParams) => {
  try {
    await connectToDatabase()
    const newCategory = await Category.create({ name: categoryName })
    return JSON.parse(JSON.stringify(newCategory))
  } catch (error) {
    return { error: "An error occurred while creating Category." }
  }
}

export const getCategories = async () => {
  try {
    await connectToDatabase()
    const AllCategory = await Category.find()

    return JSON.parse(JSON.stringify(AllCategory))
  } catch (error) {
    return { error: "An error occurred get Categories." }
  }
}

// export const getCategory = async ({ categoryName }: CreateCategoryParams) => {
//   try {
//     await connectToDatabase()
//     const newCategory = Category.create({ name: categoryName })


//     return JSON.parse(JSON.stringify(newCategory))
//   } catch (error) {
//     handleError(error)
//   }
// }
