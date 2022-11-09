"use client";

import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import { useHasMounted } from "../hooks/useHasMounted";
import { itemsAtom, sortedGroupedItemsAtom } from "./atoms";

export function Inventory() {
  const [items] = useAtom(sortedGroupedItemsAtom);
  const [_, setItems] = useAtom(itemsAtom);
  const hasMounted = useHasMounted();
  return (
    <div>
      <h1>보관함</h1>
      <button
        className="bg-red-200 text-red-600 px-3 py-1 rounded-md hover:bg-red-100 active:bg-red-300"
        onClick={() => {
          setItems(RESET);
        }}
      >
        초기화
      </button>
      <ul>
        {
          hasMounted ?
            items.map(item => {
              return (
                <li key={item.id}
                  className="list-disc"
                >
                  {item.name}{item.quantity > 1 ? ` x${item.quantity}` : null}
                </li>
              );
            }) :
            "불러오는 중..."
        }
      </ul>
    </div>
  );
}