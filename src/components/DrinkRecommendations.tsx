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
    // Get the user's most-ordered drinks from localStorage
    const topIds = getTopDrinks(3); // top 3 favorites

    const drinks = DRINKS.filter((d) =>
      topIds.includes(d.id as DrinkId)
    ) as Drink[];

    setRecommended(drinks);
  }, []);

  // If the user has no history yet, show nothing
  if (recommended.length === 0) return null;

  return (
    <section style={{ marginTop: "1.5rem" }}>
      <h2
        style={{
          fontWeight: 600,
          fontSize: "1.1rem",
          marginBottom: "0.5rem",
        }}
      >
        Recommended for you
      </h2>
      <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
        {recommended.map((drink) => (
          <li
            key={drink.id}
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: 8,
              border: "1px solid #eee",
              marginBottom: "0.4rem",
            }}
          >
            {drink.name}
          </li>
        ))}
      </ul>
    </section>
  );
};
