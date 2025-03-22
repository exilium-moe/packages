import type { RarityEnum } from "@exilium-moe/shared/types/RarityEnum";

export const formatRarityString = (rarity: RarityEnum) => {
  return {
    5: "SSR",
    4: "SR",
    3: "R",
  }[rarity];
};
