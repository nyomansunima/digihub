import { FC } from 'react'
import { ManagerHeaderBrand } from './manager-header-brand'
import { Button } from '@components/ui/button'
import { ManagerHeaderProfileMenu } from './manager-header-profile-menu'

export interface ManagerHeaderProps {}

const ManagerHeader: FC<ManagerHeaderProps> = ({}) => {
  return (
    <header className="flex fixed top-0 inset-x-0 border-b border-b-neutral-100 h-[60px] bg-white px-9">
      <ManagerHeaderBrand />

      <div className="flex flex-1"></div>

      <ul className="flex items-center gap-4">
        <Button size={'icon'}>
          <i className="fi fi-rr-bell" />
        </Button>
        <Button size={'icon'}>
          <i className="fi fi-rr-plus" />
        </Button>
      </ul>

      <ManagerHeaderProfileMenu />
    </header>
  )
}

export { ManagerHeader }
