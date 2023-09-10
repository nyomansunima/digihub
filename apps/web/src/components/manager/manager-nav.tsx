'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, ReactElement } from 'react'

interface NavItem {
  icon: string
  label: string
  path: string
}

const navItems: NavItem[] = [
  {
    icon: 'fi fi-rr-chart-pie-alt',
    label: 'Summary',
    path: '/',
  },
  {
    icon: 'fi fi-rr-piggy-bank',
    label: 'Funds',
    path: '/fund',
  },
  {
    icon: 'fi fi-rr-shopping-cart',
    label: 'Products',
    path: '/product',
  },
  {
    icon: 'fi fi-rr-megaphone',
    label: 'Audience',
    path: '/audience',
  },
  {
    icon: 'fi fi-rr-shop',
    label: 'Store',
    path: '/store',
  },
  {
    icon: 'fi fi-rr-shopping-bag',
    label: 'Orders',
    path: '/order',
  },
  {
    icon: 'fi fi-rr-comments',
    label: 'Chats',
    path: '/chat',
  },
  {
    icon: 'fi fi-rr-badge-percent',
    label: 'Discounts',
    path: '/discount',
  },
]

interface ManagerNavItemProps {
  item: NavItem
}

const ManagerNavItem: FC<ManagerNavItemProps> = ({ item }): ReactElement => {
  const active = usePathname() === `/manager${item.path}`

  return (
    <Link
      href={`/manager${item.path}`}
      className={`flex items-center px-3 h-10 gap-3 transition-all duration-500 hover:bg-neutral-100 rounded-lg hover:-translate-x-1 ${
        active ? 'bg-neutral-100' : ''
      }`}
    >
      <i className={`${item.icon} !text-xl`} />
      <span className="font-medium">{item.label}</span>
    </Link>
  )
}

interface ManagerNavProps {}

/**
 * ## ManagerNav
 *
 * Render the manage store navs
 * use to switch the link and moving into a different page
 *
 * @returns {ReactElement}
 */
const ManagerNav: FC<ManagerNavProps> = ({}): ReactElement => {
  return (
    <nav className="flex fixed bottom-0 top-[60px] left-0 bg-white border-r border-r-neutral-100 w-[270px]">
      <ul className="flex flex-col gap-3 px-3 py-6 flex-1">
        {navItems.map((item, i) => (
          <ManagerNavItem item={item} key={i} />
        ))}
      </ul>
    </nav>
  )
}

export { ManagerNav }
