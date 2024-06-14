"use server";

import { cookies } from "next/headers";

export const deleteCookies = (): void => {
  const cookieStore = cookies();
  cookieStore.delete("token");
  cookieStore.delete("currentUser");
};
