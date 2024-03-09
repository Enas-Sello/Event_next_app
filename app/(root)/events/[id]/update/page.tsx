import { auth } from "@/lib/auth/auth"
import EventForm from "@/components/shared/EventForm"
import React from "react"
import { getEventById } from "@/lib/actions/event.action"
import { UpdateEventProps } from "@/types"

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const session = await auth()
  const userID = session?.user as { id: string }
  const event = await getEventById(id)
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update Event
        </h3>
      </section>
      <div className="wrapper my-8">
        <EventForm
          userId={userID.id}
          type="Update"
          event={event}
          eventId={event._id}
        />
      </div>
    </>
  )
}

export default UpdateEvent
