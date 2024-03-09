import { Document, Schema, model, models } from "mongoose"

export interface IUser extends Document {
  user: {
    _id: string
    username: string
    email: string
    password: string
    firstName: string
    lastName: string
    isAdmin: boolean
    photo?: string
  }
}

const UserSchema = new Schema(
  {
    username: { type: String, unique: true, min: 4 },
    email: { type: String, unique: true, max: 50 },
    password: {
      type: String,

      unique: true,
      min: 4,
    },
    firstName: { type: String },
    lastName: { type: String },
    photo: { type: String },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const User = models.User || model<IUser>("User", UserSchema)

export default User
