import { Document, Schema, model, models, Types } from "mongoose"


const EventSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    location: { type: String },
    createdAt: { type: Date, default: Date.now },
    imageUrl: { type: String },
    startDateTime: { type: Date, default: Date.now },
    endDateTime: { type: Date, default: Date.now },
    price: { type: String },
    isFree: { type: Boolean, default: false },
    url: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    organizer: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
)

const Event = models.Event || model("Event", EventSchema)

export default Event
