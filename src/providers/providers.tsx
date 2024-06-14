"use client";

import { DetailsModal } from "@/components/modals/details-modal";
import { LoginModal } from "@/components/modals/login-modal";
import { RegisterModal } from "@/components/modals/register-modal";
import { Toaster } from "@/components/ui/sonner";

export const Providers = () => {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <DetailsModal />
      <Toaster richColors />
    </>
  );
};
