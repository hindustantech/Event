'use client';
import { headerLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavItem = () => {
  const pathname = usePathname();

  return (
    <ul className='md:flex-between flex w-full flex-col items-start gap-5 md:flex-row'>

      {headerLinks.map((link) => {
        const isActive = pathname == link.route;
        return (
          <li
            key={link.route}
            className={`flex p-medium-16 whitespace-nowrap ${isActive ? 'text-primary-500' : ''}`}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default NavItem