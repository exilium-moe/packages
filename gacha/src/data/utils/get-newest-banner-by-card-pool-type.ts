import type { CardPoolTypeEnum } from "../../types/CardPoolTypeEnum"
import { banners } from "../banners"

export function getNewestBannerByCardPoolType(cardPoolType: CardPoolTypeEnum) {
  return banners.findLast(b => b.cardPoolType === cardPoolType)!
}
