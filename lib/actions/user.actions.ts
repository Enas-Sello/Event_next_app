"use server"

import { revalidatePath } from "next/cache"

import { connectToDatabase } from "@/database"
import User from "@/database/models/user.model"
import Order from "@/database/models/order.model"
import Event from "@/database/models/event.model"
import { handleError } from "@/lib/utils"

import { UpdateUserParams } from "@/types"
import { InternalResponse, NotFoundResponse } from "@/constants/apiResponse"

export async function getUserById(userId: string) {
  try {
    await connectToDatabase()

    const user = await User.findById(userId)

    if (!user) {
      return { error: NotFoundResponse }
    }
    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    console.error(error)
  }
}

export async function updateUser(id: string, user: UpdateUserParams) {
  try {
    await connectToDatabase()

    const updatedUser = await User.findOneAndUpdate({ _id: id }, user, {
      new: true,
    })

    if (!updatedUser) handleError(InternalResponse)
    return JSON.parse(JSON.stringify(updatedUser))
  } catch (error) {
    console.error(error)
  }
}

export async function deleteUser(id: string) {
  try {
    await connectToDatabase()

    // Find user to delete
    const userToDelete = await User.findOne({ _id: id })

    if (!userToDelete) {
      handleError(NotFoundResponse)
    }

    await Promise.all([
      // Update the 'events' collection to remove references to the user
      Event.updateMany(
        { _id: { $in: userToDelete.events } },
        { $pull: { organizer: userToDelete._id } }
      ),

      // Update the 'orders' collection to remove references to the user
      Order.updateMany(
        { _id: { $in: userToDelete.orders } },
        { $unset: { buyer: 1 } }
      ),
    ])

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id)
    revalidatePath("/")

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
  } catch (error) {
    console.error(error)
  }
}
