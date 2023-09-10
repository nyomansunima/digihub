import { ManagerHeader } from '@components/manager/manager-header'
import { ManagerNav } from '@components/manager/manager-nav'
import ManagerView from '@components/manager/manager-view'
import { FC, ReactElement } from 'react'
import { BaseLayoutProps } from '~/types/component'

interface StoreManagerLayoutProps extends BaseLayoutProps {}

/**
 * Render the store manager layouts
 * that allow to use in all of the childs
 *
 * @returns {ReactElement}
 */
const StoreManagerLayout: FC<StoreManagerLayoutProps> = ({
  children,
}): ReactElement => {
  return (
    <>
      <ManagerHeader />
      <ManagerNav />
      <ManagerView>{children}</ManagerView>
    </>
  )
}

export default StoreManagerLayout
