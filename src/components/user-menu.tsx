import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface IUserMenuProps {
  currentUser?: string | null;
}

export const UserMenu: React.FC<IUserMenuProps> = ({ currentUser }) => {
  return (
    <>
      <figure>
        <Avatar className="size-8">
          <AvatarImage
            height={30}
            width={30}
            alt="Avatar"
            sizes="100vw"
            src={
              currentUser
                ? `https://api.dicebear.com/8.x/pixel-art/svg?seed=${currentUser}`
                : "/images/placeholder.jpg"
            }
          />
          <AvatarFallback>
            <Image
              height={30}
              width={30}
              alt="Avatar"
              sizes="100vw"
              src="/images/placeholder.jpg"
              className="animate-pulse"
            />
          </AvatarFallback>
        </Avatar>
      </figure>
      {currentUser ? (
        <p className="hidden text-sm font-semibold capitalize md:block">
          {currentUser}
        </p>
      ) : (
        <div>
          <p className="hidden text-sm font-semibold capitalize md:block">
            Não autenticado
          </p>
        </div>
      )}
    </>
  );
};
