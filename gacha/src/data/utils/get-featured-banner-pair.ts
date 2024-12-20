import { banners } from "../banners"
import { getBannerByPoolId } from "./get-banner-by-pool-id"

/**
 * Finds the pair of the banner with the specified pool_id.
 *
 * It's used for displaying and aggregating the two newest banners.
 *
 * @param poolId the first banner's pool_id
 * @returns
 */
export function getFeaturedBannerPair(poolId: number) {
  const bannerInfo = getBannerByPoolId(poolId)

  if (!bannerInfo) {
    return undefined
  }

  return banners.findLast(
    b => b.cardPoolType === bannerInfo.cardPoolType && b.pool_id !== poolId && b.startDate === bannerInfo.startDate,
  )
}
