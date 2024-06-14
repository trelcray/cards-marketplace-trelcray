import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Aside } from "@/components/layout/aside";
import { Header } from "@/components/layout/header";
import { Providers } from "@/providers/providers";
import { getCookies } from "@/utils/get-cookies";

import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cards MarketPlace",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = getCookies();

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="bg-black">
          <Header currentUser={currentUser} />
        </div>
        <Providers />
        <Aside currentUser={currentUser} />
        <main className="flex min-h-screen w-full flex-col gap-y-5 bg-gray-100 p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
