import { ICard } from "@/@types";
import { Card } from "@/components/card";
import { EmptyState } from "@/components/empty-state";
import { Error } from "@/components/error";
import { Title } from "@/components/title";
import { fetchWrapper } from "@/lib/fetch";

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
export default async function Cards() {
  const cardsData = await getData();

  if (!cardsData) {
    return <Error />;
  }

  return (
    <>
      <Title title="Minhas Cartas" />
      {cardsData.length > 0 ? (
        <div className="flex w-full flex-wrap justify-evenly gap-2">
          {cardsData.map((card, i) => (
            <Card
              key={i}
              id={card.id}
              description={card.description}
              imageUrl={card.imageUrl}
              name={card.name}
            />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </>
  );
}
