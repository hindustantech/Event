import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import NavItem from "./NavItem"


const MobileNab = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="aling-middle">
          <Image src="/assets/icons/menu.svg" alt="menu"
            width={24}
            height={24}
            className="coursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className=" flex flex-col gap-6 bg-white md:hidden">
          <Image
            src="/assets/images/logo.svg"
            width={128}
            height={38} 
            alt="Icon"          
            />
            <Separator className="border border-gray-50" />
            <NavItem/>
        </SheetContent>
      </Sheet>

    </nav>

  )
}

export default MobileNab