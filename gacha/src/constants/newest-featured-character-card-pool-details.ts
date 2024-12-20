import { characters } from "../data/characters"
import { getFeaturedBannerPair } from "../data/utils/get-featured-banner-pair"
import { getNewestBannerByCardPoolType } from "../data/utils/get-newest-banner-by-card-pool-type"

const NEWEST_FEATURED_CHARACTER_CARD_POOL = getNewestBannerByCardPoolType(3)
const PAIR = getFeaturedBannerPair(NEWEST_FEATURED_CHARACTER_CARD_POOL.pool_id)

export const NEWEST_FEATURED_CHARACTER_CARD_POOL_DETAILS = (() => {
  const featured5StarNames = [...(PAIR?.rateUp5Ids || []), ...NEWEST_FEATURED_CHARACTER_CARD_POOL.rateUp5Ids!].map(
    id => characters.find(c => c.id === id)!.name,
  )
  const featured4StarNames = [...(PAIR?.rateUp4Ids || []), ...NEWEST_FEATURED_CHARACTER_CARD_POOL.rateUp4Ids!].map(
    id => characters.find(c => c.id === id)!,
  )

  return {
    ...NEWEST_FEATURED_CHARACTER_CARD_POOL,
    rateUp5Names: featured5StarNames,
    rateUp4Names: featured4StarNames,
  }
})()
