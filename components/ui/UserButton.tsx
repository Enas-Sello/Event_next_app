import Image from "next/image"
import Link from "next/link"
import React from "react"

const UserButton = ({ user }: any) => {
  return (
    <Link href={"/profile"} className="border-2 border-gray-400 rounded-full">
      <Image
        src={`${user?.photo ? user?.photo : "/assets/images/test.png"}`}
        alt="user"
        width={28}
        height={28}
        priority={true}
        className="rounded-full"
      />
    </Link>
  )
}

export default UserButton
