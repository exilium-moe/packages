import type { BannerInfo } from "../banners"

export function isFeaturedBanner(bannerInfo: BannerInfo): bannerInfo is Extract<BannerInfo, { cardPoolType: 3 | 4 }> {
  return [3, 4].includes(bannerInfo.cardPoolType)
}
