// src/data/drinks.ts

// List of all drinks we support
export const DRINKS = [
  {
    id: "cappuccino",
    name: "Cappuccino",
  },
  {
    id: "latte",
    name: "Latte",
  },
  {
    id: "americano",
    name: "Americano",
  },
  {
    id: "mocha",
    name: "Mocha",
  },
  {
    id: "flat-white",
    name: "Flat White",
  },
  {
    id: "macchiato",
    name: "Macchiato",
  },
] as const;

// TypeScript type = "cappuccino" | "latte" | ...
export type DrinkId = (typeof DRINKS)[number]["id"];
