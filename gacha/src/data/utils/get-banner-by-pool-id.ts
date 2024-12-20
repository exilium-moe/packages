import { banners, type BannerInfo } from "../banners"

export function getBannerByPoolId(pool_id: number): BannerInfo | undefined {
  return banners.find(b => b.pool_id === pool_id)
}
