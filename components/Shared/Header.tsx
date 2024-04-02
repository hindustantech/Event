import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import NavItem from './NavItem'
import MobileNab from './MobileNab'

const Header = () => {
  return (
    <header className='w-full border-b'>
      <div className='wrapper flex items-center justify-between'>
        <Link href='/' className='w-36 m-2'>
          <Image
            src="/assets/images/logo.png"
            width={128}
            height={30}
            alt='DreamCraft' />
        </Link>

        <SignedIn>
          <nav className="hidden md:flex  w-full max-w-xs">
            <NavItem />
          </nav>
        </SignedIn>
        <div className='flex w-32 justify-end gap-3 m-2'>
          <SignedIn>
            <UserButton afterSignOutUrl='/' />
            <MobileNab />
          </SignedIn>

          <SignedOut>
            <Button asChild className='rounded-bold ' size="lg">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}

export default Header