// src/components/DrinkRecommendations.tsx
import React, { useEffect, useState } from "react";
import { DRINKS, type DrinkId } from "@/data/drinks";
import { getTopDrinks } from "@/lib/orderHistory";

type Drink = {
  id: DrinkId;
  name: string;
};

export const DrinkRecommendations: React.FC = () => {
  const [recommended, setRecommended] = useState<Drink[]>([]);

  useEffect(() => {
    // Fetch top 3 drinks from user's order history
    const topIds = getTopDrinks(3);
    const drinks = DRINKS.filter((d) =>
      topIds.includes(d.id as DrinkId)
    ) as Drink[];

    setRecommended(drinks);
  }, []);

  return (
    <section className="mt-6">
      <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
        🔥 Recommended for you
      </h2>
<p className="text-[10px] text-muted-foreground">
  debug: {JSON.stringify(getTopDrinks(3))}
</p>

      {recommended.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          Start ordering drinks and we’ll show your favorites here.
        </p>
      ) : (
        <ul className="grid gap-2">
          {recommended.map((drink) => (
            <li
              key={drink.id}
              className="border rounded-xl px-4 py-3 text-foreground hover:bg-muted transition"
            >
              <div className="font-medium">{drink.name}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
