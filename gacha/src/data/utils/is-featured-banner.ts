import type { BannerInfo } from "../banners";
import { CARD_POOL_TYPE_MAP } from "../../types/CardPoolTypeEnum";

export function isFeaturedBanner(
  bannerInfo: BannerInfo
): bannerInfo is Extract<BannerInfo, { cardPoolType: 3 | 4 }> {
  return [
    CARD_POOL_TYPE_MAP["Featured Character"],
    CARD_POOL_TYPE_MAP["Featured Weapon"],
  ].includes(bannerInfo.cardPoolType as 3 | 4);
}
