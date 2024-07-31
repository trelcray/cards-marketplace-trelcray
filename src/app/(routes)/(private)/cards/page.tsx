import { IGetCardsResponse } from "@/@types";
import { Card } from "@/components/card";
import { EmptyState } from "@/components/empty-state";
import { Error } from "@/components/error";
import { Pagination } from "@/components/pagination";
import { SelectRpp } from "@/components/select";
import { Title } from "@/components/title";
import { fetchWrapper } from "@/lib/fetch";

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
export default async function Cards({
  searchParams,
}: {
  searchParams: { rpp?: string; page?: string; more?: string };
}) {
  const searchRpp = searchParams?.rpp || "9";
  const searchPage = Number(searchParams?.page) || 1;
  const searchMore = Boolean(searchParams?.more) || false;

  const cardsData = await getAllCards(searchRpp, searchPage, searchMore);

  if (!cardsData) {
    return <Error />;
  }

  const { list, more, page, rpp } = cardsData;

  return (
    <>
      <Title title="Adicionar Cartas" />
      <SelectRpp rpp={rpp.toString()} />
      {list.length > 0 ? (
        <>
          <div className="flex w-full flex-wrap justify-evenly gap-2">
            {list.map((card, i) => (
              <Card
                key={i}
                id={card.id}
                description={card.description}
                imageUrl={card.imageUrl}
                name={card.name}
                isCreate
              />
            ))}
          </div>
          <Pagination more={more} pageIndex={page} url="/cards" />
        </>
      ) : (
        <EmptyState />
      )}
    </>
  );
}
