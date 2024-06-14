"use client";

import { ArrowRightLeft, Home, SquarePlus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface INavlinkProps {
  currentUser?: string | null;
}

export const Navlink: React.FC<INavlinkProps> = ({ currentUser }) => {
  const pathname = usePathname();

  return (
    <nav className="relative flex flex-col md:items-center">
      <ul className="fixed flex flex-col items-center justify-center gap-y-1">
        <li
          className={cn(
            "relative w-52 rounded-lg text-gray-800 transition-colors duration-300 hover:bg-blue-600 hover:text-white",
            {
              "bg-blue-600 text-white": pathname === "/",
            }
          )}
        >
          <Link href="/" className="flex w-full rounded-lg p-1 py-3">
            <i className="px-2">
              <Home />
            </i>{" "}
            Início
          </Link>
          <span
            className={cn({
              "transition-opacity duration-300 before:absolute before:-left-6 before:top-[0.125rem] before:h-11 before:w-1 before:rounded-r-lg before:bg-blue-600":
                pathname === "/",
            })}
          />
        </li>
        {currentUser && (
          <>
            <li
              className={cn(
                "relative w-52 rounded-lg text-gray-800 transition-colors duration-300 hover:bg-blue-600 hover:text-white",
                {
                  "bg-blue-600 text-white": pathname === "/trade",
                }
              )}
            >
              <Link href="/trade" className="flex w-full rounded-lg p-1 py-3">
                <i className="px-2">
                  <ArrowRightLeft />
                </i>{" "}
                Criar Trocas
              </Link>
              <span
                className={cn({
                  "transition-opacity duration-300 before:absolute before:-left-6 before:top-[0.125rem] before:h-11 before:w-1 before:rounded-r-lg before:bg-blue-600":
                    pathname === "/trade",
                })}
              />
            </li>
            <li
              className={cn(
                "relative w-52 rounded-lg text-gray-800 transition-colors duration-300 hover:bg-blue-600 hover:text-white",
                {
                  "bg-blue-600 text-white": pathname === "/cards",
                }
              )}
            >
              <Link href="/cards" className="flex w-full rounded-lg p-1 py-3">
                <i className="px-2">
                  <SquarePlus />
                </i>{" "}
                Cards
              </Link>
              <span
                className={cn({
                  "transition-opacity duration-300 before:absolute before:-left-6 before:top-[0.125rem] before:h-11 before:w-1 before:rounded-r-lg before:bg-blue-600":
                    pathname === "/cards",
                })}
              />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
