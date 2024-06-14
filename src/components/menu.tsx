"use client";

import { LogOut, PackageOpen, RefreshCcw, User, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLoginModal } from "@/hooks/use-login-modal";
import { useRegisterModal } from "@/hooks/use-register-modal";
import { deleteCookies } from "@/utils/delete-cookies";

interface IDropdownMenu {
  children: React.ReactNode;
  currentUser?: string | null;
}

export function Dropdown({ children, currentUser }: IDropdownMenu) {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const navigate = useRouter();

  const handleLogout = () => {
    deleteCookies();
    navigate.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="cursor-pointer rounded-sm px-2 py-1 hover:bg-gray-100/90"
        asChild
      >
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!currentUser ? (
          <>
            <DropdownMenuItem onClick={loginModal.onOpen}>
              <User className="mr-2 size-4" />
              <span>Acessar</span>
              <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={registerModal.onOpen}>
              <UserPlus className="mr-2 size-4" />
              <span>Cadastrar</span>
              <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem onClick={() => navigate.push("/me/cards")}>
              <PackageOpen className="mr-2 size-4" />
              <span>Minhas Cartas</span>
              <DropdownMenuShortcut>⇧⌘M</DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => navigate.push("/me/trade")}>
              <RefreshCcw className="mr-2 size-4" />
              <span>Minhas Trocas</span>
              <DropdownMenuShortcut>⇧⌘M</DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              <LogOut className="mr-2 size-4" />
              <span>Deslogar</span>
              <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
