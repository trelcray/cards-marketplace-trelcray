import { ICurrentUserResponse, IGetTradeResponse, ITradeInfo } from "@/@types";
import { fetchWrapper } from "@/api/fetch";
import { EmptyState } from "@/components/empty-state";
import { Error } from "@/components/error";
import { Pagination } from "@/components/pagination";
import { SelectRpp } from "@/components/select";
import { Title } from "@/components/title";
import { TradeCard } from "@/components/trade-card";

async function getData(rpp: string, page: number, more: boolean) {
  try {
    const user = await fetchWrapper<ICurrentUserResponse>("/me", {
      next: { revalidate: 360 },
    });

    const response = await fetchWrapper<IGetTradeResponse>(
      `/trades?rpp=${rpp}&page=${page}&more=${more}`,
      { next: { tags: ["meTrades"], revalidate: 360 } }
    );

    const data = response.list.filter(
      (trade: ITradeInfo) => trade.userId === user.id
    );

    return {
      list: data,
      rpp: response.rpp,
      page: response.page,
    };
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

  const data = await getData(searchRpp, searchPage, searchMore);

  if (!data) {
    return <Error />;
  }
  const { list, rpp, page } = data;

  const more = list.length > rpp;

  return (
    <>
      <Title title="Minhas Trocas" />
      {list.length > 0 ? (
        <>
          <SelectRpp rpp={rpp.toString()} />
          <div className="flex flex-wrap items-center justify-evenly gap-2">
            {list.length > 0 &&
              list.map((item, i) => {
                const offeringCards = item.tradeCards.filter(
                  (card) => card.type === "OFFERING"
                );
                const receivingCards = item.tradeCards.filter(
                  (card) => card.type === "RECEIVING"
                );
                return (
                  <TradeCard
                    key={i}
                    tradeId={item.id}
                    createdAt={item.createdAt}
                    index={i}
                    offeringCards={offeringCards}
                    receivingCards={receivingCards}
                    user={item.user}
                    isDelete
                  />
                );
              })}
          </div>
          <Pagination more={more} pageIndex={page} />
        </>
      ) : (
        <EmptyState />
      )}
    </>
  );
}
