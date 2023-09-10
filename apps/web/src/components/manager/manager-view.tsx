import { FC, ReactElement, ReactNode } from 'react'

interface ManagerViewProps {
  children: ReactNode
}

/**
 * ## ManagerView
 * 
 * Render the view of manager
 * that allow to dynamically scale and manage

* @returns {ReactElement}
 */
const ManagerView: FC<ManagerViewProps> = ({ children }): ReactElement => {
  return (
    <section className="flex flex-col flex-1 mt-[60px] py-14 ml-[326px]">
      {children}
    </section>
  )
}

export default ManagerView
