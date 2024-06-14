"use server";

import { revalidateTag } from "next/cache";

export async function revalidateTrades() {
  revalidateTag("meTrades");
  revalidateTag("trades");
}
export async function revalidateCards() {
  revalidateTag("meCards");
}
