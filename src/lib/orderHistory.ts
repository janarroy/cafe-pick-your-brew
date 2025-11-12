// src/lib/orderHistory.ts
import type { DrinkId } from "@/data/drinks";

const STORAGE_KEY = "brewBuddy_order_history";
const SHOP_STORAGE_KEY = "brewBuddy_shop_history";

type OrderHistory = Record<DrinkId, number>;
type ShopHistory = Record<number, number>;

function getEmptyHistory(): OrderHistory {
  return {
    "cappuccino": 0,
    "latte": 0,
    "americano": 0,
    "mocha": 0,
    "flat-white": 0,
    "macchiato": 0,
  };
}

// Load history from localStorage
export function loadOrderHistory(): OrderHistory {
  if (typeof window === "undefined") {
    // safety: if this ever runs on server, just return empty
    return getEmptyHistory();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getEmptyHistory();

    const parsed = JSON.parse(raw) as Partial<OrderHistory>;
    return { ...getEmptyHistory(), ...parsed };
  } catch {
    return getEmptyHistory();
  }
}

// Save history to localStorage
function saveOrderHistory(history: OrderHistory) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

// Call this whenever someone successfully orders a drink
export function recordOrder(drinkId: DrinkId) {
  const history = loadOrderHistory();
  history[drinkId] = (history[drinkId] || 0) + 1;
  saveOrderHistory(history);
}

// Get the top N most-ordered drinks
export function getTopDrinks(limit: number = 3): DrinkId[] {
  const history = loadOrderHistory();

  const entries = Object.entries(history) as [DrinkId, number][];

  return entries
    .sort((a, b) => b[1] - a[1]) // highest count first
    .filter(([, count]) => count > 0)
    .slice(0, limit)
    .map(([drinkId]) => drinkId);
}

// Load shop history from localStorage
export function loadShopHistory(): ShopHistory {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(SHOP_STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw) as ShopHistory;
    return parsed;
  } catch {
    return {};
  }
}

// Save shop history to localStorage
function saveShopHistory(history: ShopHistory) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SHOP_STORAGE_KEY, JSON.stringify(history));
}

// Call this whenever someone orders from a shop
export function recordShopOrder(shopId: number) {
  const history = loadShopHistory();
  history[shopId] = (history[shopId] || 0) + 1;
  saveShopHistory(history);
}

// Get recommended shop IDs based on order frequency
export function getRecommendedShops(limit: number = 2): number[] {
  const history = loadShopHistory();

  const entries = Object.entries(history) as [string, number][];

  return entries
    .sort((a, b) => b[1] - a[1]) // highest count first
    .filter(([, count]) => count > 0)
    .slice(0, limit)
    .map(([shopId]) => parseInt(shopId, 10));
}
