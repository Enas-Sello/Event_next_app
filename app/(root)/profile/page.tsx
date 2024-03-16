import Collection from "@/components/shared/Collection"
import { Button } from "@/components/ui/button"
import { getEventsByUser } from "@/lib/actions/event.action"
import { auth } from "@/lib/auth/auth"
import Link from "next/link"
import React from "react"

const profile = async () => {
  const session = await auth()
  const userID = session?.user as { id: string }
  const organizedEvents = await getEventsByUser({ userId: userID.id, page: 1 })
  return (
    <>
      <section className=" bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className=" wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">my tickets </h3>
          <Button asChild className=" button hidden sm:flex">
            <Link href="/#events"> explore more events</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        <Collection
          data={[]}
          emptyTitle="No Events tickets purchased yet"
          emptyStateSubtext="No Worries Plenty of exciting events to explore"
          collectionType="My_Tickets"
          limit={3}
          page={1}
          totalPages={2}
          urlParamName="ordersPages"
        />
      </section>
      <section className=" bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className=" wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">
            Events organized{" "}
          </h3>
          <Button asChild className=" button hidden sm:flex">
            <Link href="/events/create"> create new event</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        <Collection
          data={organizedEvents?.data}
          emptyTitle="No Events have been created yet"
          emptyStateSubtext="create some now"
          collectionType="Event_Organize"
          limit={6}
          page={1}
          totalPages={2}
          urlParamName="eventsPages"
        />
      </section>
    </>
  )
}

export default profile
