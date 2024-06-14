"use server";

import { cookies } from "next/headers";

import { ILoginResponse } from "@/@types";

export const setCookies = ({ token, user }: ILoginResponse): void => {
  const cookieStore = cookies();
  const oneDay = 24 * 60 * 60;
  cookieStore.set("token", token, { maxAge: oneDay, httpOnly: true });
  cookieStore.set("currentUser", user.name, { maxAge: oneDay, httpOnly: true });
};
