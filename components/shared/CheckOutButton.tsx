"use client"
import { IEvent } from "@/database/models/event.model"
import React from "react"
import { Button } from "../ui/button"
import Link from "next/link"
import Checkout from "../Checkout"

const CheckOutButton = ({
  event,
  userID,
}: {
  event: IEvent
  userID: string
}) => {
  const closedEvent = new Date(event.endDateTime) < new Date()

  return (
    <div className="flex items-center gap-3">
      {closedEvent ? (
        <p className="p-2 text-red-400">
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <>
          {!userID && (
            <Button asChild className="button rounded-full" size="lg">
              <Link href="/login">Get Tickets</Link>
            </Button>
          )}
          {userID && (
            <Button asChild className="button rounded-full" size="lg">
              <Checkout event={event} userId={userID} />
            </Button>
          )}
        </>
      )}
    </div>
  )
}

export default CheckOutButton
