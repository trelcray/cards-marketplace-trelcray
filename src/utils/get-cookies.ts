import { cookies } from "next/headers";

export const getCookies = () => {
  const cookieStore = cookies();
  const currentUser = cookieStore.get("currentUser")?.value;

  return currentUser;
};
