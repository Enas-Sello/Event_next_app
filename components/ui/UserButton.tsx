import Image from "next/image"
import Link from "next/link"
import React from "react"

const UserButton = ({ user }: any) => {
  console.log('user',user)
  return (
    <Link href={"/profile"} className="border-2 border-gray-400 rounded-full">
      <Image
        src={`${user?.photo ? user?.photo : "/assets/images/test.png"}`}
        alt="user"
        width={24}
        height={24}
        priority={true}
        className="rounded-full "
      />
    </Link>
  )
}

export default UserButton
