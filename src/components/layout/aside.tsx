"use client";

import { useAside } from "@/hooks/use-aside";

import { Navlink } from "../navlink";

interface IAsideProps {
  currentUser?: string | null;
}

export const Aside: React.FC<IAsideProps> = ({ currentUser }) => {
  const { isOpen } = useAside();

  if (!isOpen) {
    return null;
  }

  return (
    <aside className="mt-20 hidden w-full max-w-64 md:block">
      <Navlink currentUser={currentUser} />
    </aside>
  );
};
