export interface Item {
  type: "item" | "character";
  name: string;
  id: string;
}
export type GroupedItem = Item & { quantity: number };