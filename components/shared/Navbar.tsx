import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import NavItems from "./NavItems"
import MobileNav from "./MobileNav"
import UserButton from "../ui/UserButton"
import { auth } from "@/lib/auth/auth"
import { getUserById } from "@/lib/actions/user.actions"
import { handelLogout } from "@/lib/actions/auth.action"

const Navbar = async () => {
  const session = await auth()
  const userID = session?.user as { id: string }
  const user = await getUserById(userID?.id)
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link className="w-36" href={"/"}>
          <Image
            src={"/assets/images/logo.svg"}
            alt="logo"
            width={128}
            height={38}
            priority={true}
          />
        </Link>

        {/* <div> */}
        <nav className="lg:flex-between hidden w-full max-w-xs">
          <NavItems />
        </nav>
        {/* </div> */}
        {/* mobile */}
        <div className=" flex justify-end gap-3">
          <div className=" flex justify-center items-center gap-3">
            <MobileNav />
            {session?.user && <UserButton user={user} />}
          </div>
          {session?.user && (
            <form action={handelLogout}>
              <Button className="rounded-full ">Logout</Button>
            </form>
          )}
          {!session?.user && (
            <Button asChild className="rounded-full ">
              <Link href={"/login"}>Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
