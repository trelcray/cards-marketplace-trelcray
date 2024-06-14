import { ICard, IGetCardsResponse } from "@/@types";
import { fetchWrapper } from "@/api/fetch";
import { EmptyState } from "@/components/empty-state";
import { Error } from "@/components/error";
import { Title } from "@/components/title";

import { TradeClient } from "./trade-client";

async function getData() {
  try {
    const data = await fetchWrapper<ICard[]>("/me/cards", {
      next: { tags: ["meCards"], revalidate: 360 },
    });
    return data;
  } catch (error) {
    console.error((error as Error).message);
  }
}

async function getAllCards(rpp: string, page: number, more: boolean) {
  try {
    const data = await fetchWrapper<IGetCardsResponse>(
      `/cards?rpp=${rpp}&page=${page}&more=${more}`,
      { next: { revalidate: 360 } }
    );
    return { ...data };
  } catch (error) {
    console.error((error as Error).message);
  }
}

export default async function Trade({
  searchParams,
}: {
  searchParams: { rpp?: string; page?: string; more?: string };
}) {
  const searchRpp = searchParams?.rpp || "9";
  const searchPage = Number(searchParams?.page) || 1;
  const searchMore = Boolean(searchParams?.more) || false;

  const cardsData = await getData();
  const allCardsData = await getAllCards(searchRpp, searchPage, searchMore);

  if (!cardsData || !allCardsData) {
    return <Error />;
  }

  const { list, more, page } = allCardsData;
  return (
    <>
      <Title title="Solicitação de troca" />
      {cardsData.length > 0 ? (
        <TradeClient
          cards={cardsData}
          allCards={list}
          more={more}
          page={page}
        />
      ) : (
        <EmptyState />
      )}
    </>
  );
}
