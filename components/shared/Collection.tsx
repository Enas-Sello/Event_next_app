import { CollectionProps } from "@/types"
import React from "react"
import Card from "./Card"

const Collection = ({
  data,
  collectionType,
  emptyStateSubtext,
  emptyTitle,
  limit,
  page,
  totalPages,
}: CollectionProps) => {
  return (
    <>
      {data?.length > 0 ? (
        <div className="flex flex-col items-center gap-10 ">
          <ul className="grid w-full  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-10">
            {data.map((event) => {
              const hasOrderLink = collectionType === "Event_Organize"
              const hidePrice = collectionType === "My_Tickets"
              return (
                <li key={event._id} className="flex justify-center">
                  <Card
                    hidePrice={hidePrice}
                    event={event}
                    hasOrderLink={hasOrderLink}
                  />
                </li>
              )
            })}
          </ul>
          {/* <div>pagination</div> */}
        </div>
      ) : (
        <div className=" flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-gray-50 py-28 text-center ">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <h3 className="p-regular-18">{emptyStateSubtext}</h3>
        </div>
      )}
    </>
  )
}

export default Collection
