"use server";

import { cookies } from "next/headers";

export async function fetchWrapper<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const headers = new Headers(init?.headers);

  if (init?.method !== "DELETE") {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const initWithAuth: RequestInit = {
    ...init,
    headers: headers,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}${input}`,
    initWithAuth
  );

  if (!response.ok) {
    throw new Error(
      `Erro ${response.status}: Desculpe ocorreu um erro interno!`
    );
  }

  if (init?.method === "DELETE") {
    return { message: "Requisição completada com sucesso" } as T;
  }

  const result = await response.json();
  return result as T;
}
