import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import NavItems from "./NavItems"

const MobileNav = () => {
  return (
    <nav className="lg:hidden">
      <Sheet>
        <SheetTrigger className=" align-middle ">
          <Image
            src={"/assets/icons/menu.svg"}
            alt="menu"
            width={24}
            height={24}
            className=" cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white lg:hidden">
          <Image
            src={"/assets/images/logo.svg"}
            alt="logo"
            width={128}
            height={38}
            className=" cursor-pointer"
          />
          <Separator className=" border  border-gray-100" />
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  )
}

export default MobileNav
