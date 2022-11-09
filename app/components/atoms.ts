import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { GroupedItem, Item } from "./types";

export const ticketAtom = atomWithStorage<number>("ticket", 10);
export const nextSignInRewardAtom = atomWithStorage<number>("sign-in", 0);
export const itemsAtom = atomWithStorage<Item[]>("items", []);
export const groupedItemMapAtom = atom(
  (get) => get(itemsAtom)
    .reduce((a, b) => {
      if (a.has(b.id)) {
        a.get(b.id)!.quantity++;
      } else {
        a.set(b.id, {
          ...b,
          quantity: 1,
        })
      }
      return a;
    }, new Map<string, GroupedItem>())
);
export const sortedGroupedItemsAtom = atom(
  (get) => Array.from(get(groupedItemMapAtom).values())
    .sort((a, b) => b.quantity - a.quantity)
);
export const lastDrawnItemAtom = atom<Item | undefined>(undefined);