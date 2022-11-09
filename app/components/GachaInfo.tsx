"use client";

import { useAtom } from "jotai";
import { useEffect } from "react";
import { useHasMounted } from "../hooks/useHasMounted";
import { nextSignInRewardAtom, ticketAtom } from "./atoms";

export const GachaInfo = () => {
  const [ticket, setTicket] = useAtom(ticketAtom);
  const [nextSignInReward, setNextSignInReward] = useAtom(nextSignInRewardAtom);
  useEffect(() => {
    const now = Date.now();
    if (now < nextSignInReward) {
      return;
    }
    const tomorrow = new Date(now).setHours(0, 0, 0, 0) + 86400000;
    setNextSignInReward(tomorrow);
    setTicket((ticket) => ticket < 3 ? 3 : ticket);
  }, [nextSignInReward, setNextSignInReward, setTicket]);
  const hasMounted = useHasMounted();
  return (
    <div>
      {
        hasMounted ? (
          ticket > 0 ?
            `보유 실험권: ${ticket}` :
            `내일 0시에 실험권 보충`) :
          "불러오는 중"
      }
    </div>
  );
}