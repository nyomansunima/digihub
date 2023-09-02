import DynamicLogo from '@components/brand/dynamic-logo'
import { FC } from 'react'

/**
 * ## ManagerHeaderBrand
 *
 * Render the brand that including the logo
 * and the title
 *
 * @returns {ReactElement}
 */
const ManagerHeaderBrand: FC = () => {
  return (
    <div className="flex gap-3 items-center">
      <DynamicLogo height={32} widhth={32} />
      <h2 className="text-base font-medium leading-none">Manager</h2>
    </div>
  )
}

export { ManagerHeaderBrand }
