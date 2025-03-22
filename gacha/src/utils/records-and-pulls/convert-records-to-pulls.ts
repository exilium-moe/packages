import type { GachaRecord } from "../../types/GachaRecord";
import type { Character } from "@exilium-moe/shared/types/Character";
import type { Weapon } from "@exilium-moe/shared/types/Weapon";
import type { CardPoolTypeEnum } from "../../types/CardPoolTypeEnum";
import type { Pull } from "../../types/Pull";
import { sortRecords } from "./sort-records";

export const convertRecordsToPulls = ({
  records,
  characters,
  weapons,
  cardPoolType,
}: {
  records: GachaRecord[];
  characters: Character[];
  weapons: Weapon[];
  cardPoolType: CardPoolTypeEnum;
}): Pull[] => {
  const processedPulls = sortRecords(records).map((record) => {
    const itemEquivalent =
      characters.find((c) => c.id === record.item) ??
      weapons.find((w) => w.id === record.item);

    return {
      ...record,
      name: itemEquivalent?.name ?? "-",
      rarity: itemEquivalent?.rarity ?? -1,
      cardPoolType,
    };
  });

  let group = 1;

  return processedPulls.map((p, i, pulls) => {
    if (i !== 0 && pulls[i - 1].time === p.time) {
      group++;
    } else {
      group = 1;
    }

    if (group > 10) {
      throw new Error("Invalid pull group number");
    }

    return {
      group,
      ...p,
    };
  });
};
