import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'

const ManagerHeaderProfileMenu = () => {
  // TODO: replace with the real user profile avatar
  const imageUrl = `/images/avatar-placeholder.png`

  return (
    <div className="flex justify-center items-center ml-7">
      <Avatar>
        <AvatarImage src={imageUrl} width={40} height={40} />
        <AvatarFallback>NS</AvatarFallback>
      </Avatar>
    </div>
  )
}

export { ManagerHeaderProfileMenu }
