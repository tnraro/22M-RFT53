import { Gacha } from "./components/Gacha";
import { Inventory } from "./components/Inventory";
import { GachaResult } from "./components/GachaResult";
import type { Item } from "./components/types";
import { fetchCharacterSkin, fetchL10n } from "./er/fetch";
import { GachaInfo } from "./components/GachaInfo";

export default async function Home() {
  const hashtag = "#이터널리턴뽑기";
  const l10n = await fetchL10n();
  const l = new Map(l10n.split(/\r\n/).map(x => x.split("┃") as [string, string]));
  const characters = await fetchCharacterSkin();
  const items: Item[] = characters
    .filter((x: any) => x.code !== 1024002) // er-api bug
    .map((x: Record<string, any>) => {
      return {
        type: "character",
        id: x.code,
        name: l.get(`Skin/Name/${x.code}`),
      };
    });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex sm:flex-row flex-col justify-between">
        <h1>
          이터널리턴 뽑기~
        </h1>
        <GachaInfo />
      </div>
      <Gacha items={items} />
      <GachaResult hashtag={hashtag} />
      <Inventory />
    </div>
  )
}
