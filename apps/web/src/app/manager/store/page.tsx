import UpdateStoreForm from '@components/manager/store/update-store-form'
import { Metadata } from 'next'
import { FC } from 'react'

export const metadata: Metadata = {
  title: 'Store | Shop Manager',
  description: 'Manage how the store look like',
}

const StorePage: FC = () => {
  return (
    <main className="flex w-8/12">
      <UpdateStoreForm />
    </main>
  )
}

export default StorePage
