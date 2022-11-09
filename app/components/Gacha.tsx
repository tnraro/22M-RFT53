"use client";

import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { useHasMounted } from "../hooks/useHasMounted";
import { itemsAtom, lastDrawnItemAtom, ticketAtom } from "./atoms";
import type { Item } from "./types";

interface GachaProps {
  items: Item[];
}

export function Gacha(props: GachaProps) {
  const [items, setItems] = useAtom(itemsAtom);
  const [drawnItem, setDrawnItem] = useState<Item | undefined>(undefined);
  const [lastDrawnItem, setLastDrawnItem] = useAtom(lastDrawnItemAtom);
  const [ticket, setTicket] = useAtom(ticketAtom);
  const gachaItems = useMemo(() =>
    drawnItem == null ?
      props.items :
      [...props.items.slice().filter(x => x.id !== drawnItem.id).sort(() => Math.random() - 0.5), drawnItem], [props.items, drawnItem]);
  const hasMounted = useHasMounted();
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <button
        disabled={!hasMounted || drawnItem != null || ticket <= 0}
        className="bg-slate-200 text-slate-600 px-3 py-1 rounded-md hover:bg-slate-100 active:bg-slate-300 disabled:bg-slate-100 disabled:text-slate-400"
        onClick={() => {
          const item = props.items.at(Math.random() * props.items.length);
          if (item == null) throw new Error("");
          setDrawnItem(item);
          setLastDrawnItem(undefined);
        }}>
        실험하기
      </button>
      <div className="max-h-6 overflow-clip text-center">
        {
          drawnItem == null ? (
            <div style={{ animation: "0.3s ease-in-out 0.5s 2 flash, 0.5s gacha-bounce" }}>
              {lastDrawnItem?.name}
            </div>
          ) : (
            <ul
              style={{ animation: "3s ease-in slidein" }}
              onAnimationEnd={() => {
                setLastDrawnItem(drawnItem);
                setDrawnItem(undefined);
                setItems((items) => ([
                  ...items,
                  drawnItem
                ]));
                setTicket((ticket) => ticket - 1);
              }}>
              {gachaItems.map(item => <li key={item.id}>{item.name}</li>)}
            </ul>
          )
        }
      </div>
    </div>
  )
}