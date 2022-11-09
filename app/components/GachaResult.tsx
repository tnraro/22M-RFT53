"use client";

import { useAtom } from "jotai";
import { lastDrawnItemAtom } from "./atoms";

export interface GachaResultProps {
  hashtag: string;
}
export const GachaResult = (props: GachaResultProps) => {
  const [lastDrawnItem] = useAtom(lastDrawnItemAtom);
  const link = `https://twitter.com/hashtag/${encodeURIComponent(props.hashtag)}`;
  if (lastDrawnItem == null) return null;
  return (
    <div className="flex justify-center">
      <button
        disabled={lastDrawnItem == null}
        className="bg-sky-200 text-sky-600 px-3 py-1 rounded-md hover:bg-sky-100 active:bg-sky-300 disabled:bg-sky-100 disabled:text-sky-400"
      >
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${props.hashtag}\n${lastDrawnItem?.name} 등장!`)}`}
          target="_blank"
          rel="noreferrer"
        >
          트윗하기
        </a>
      </button>
    </div>
  );
}