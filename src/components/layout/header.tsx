"use client";

import { useCallback } from "react";

import { AlignJustify } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { useAside } from "@/hooks/use-aside";

import { Dropdown } from "../menu";
import { Navbar } from "../navbar";
import { Button } from "../ui/button";
import { UserMenu } from "../user-menu";

interface IHeaderProps {
  currentUser?: string | null;
}

export const Header: React.FC<IHeaderProps> = ({ currentUser }) => {
  const aside = useAside();
  const toggle = useCallback(() => {
    if (aside.isOpen) {
      aside.onClose();
    } else {
      aside.onOpen();
    }
  }, [aside]);

  return (
    <div className="fixed z-10 w-full bg-white">
      <div className="py-1">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <div className="flex w-full max-w-44 items-center justify-between sm:max-w-64">
              <Link href="/" className="text-center font-semibold">
                <p>
                  <span className="text-blue-600">Mer</span>cado
                </p>
                <p>
                  Car<span className="text-blue-600">tas</span>
                </p>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="hidden rounded-full md:flex"
                onClick={toggle}
              >
                <AlignJustify />
              </Button>
              <Navbar currentUser={currentUser}>
                <AlignJustify />
              </Navbar>
            </div>
            <Dropdown currentUser={currentUser}>
              <div className="flex flex-col items-center justify-center">
                <UserMenu currentUser={currentUser} />
              </div>
            </Dropdown>
          </div>
        </Container>
      </div>
    </div>
  );
};
