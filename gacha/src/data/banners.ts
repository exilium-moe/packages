import type { CardPoolTypeEnum } from "../types/CardPoolTypeEnum"

/**
 * Represents a rate-up rule with associated featured gacha item names and date range.
 */
export type BannerInfo =
  | {
      pool_id: number
      cardPoolType: Extract<CardPoolTypeEnum, 3 | 4>
      name: string
      rateUp5Ids: number[] // Mandatory for cardPoolType 3 or 4
      rateUp4Ids: number[]
      startDate: string
      endDate: string
      isCstStart?: boolean
      isCstEnd?: boolean
    }
  | {
      pool_id: number
      cardPoolType: Exclude<CardPoolTypeEnum, 3 | 4>
      name: string
      rateUp5Ids?: number[] // Optional for non-featured banner
      rateUp4Ids?: number[]
      startDate: string
      endDate: string
      isCstStart?: boolean
      isCstEnd?: boolean
    }

const standardBanners: BannerInfo[] = [
  {
    pool_id: 1001,
    cardPoolType: 1,
    name: "Standard",
    startDate: "2024-12-01 00:00",
    endDate: "2222-12-01 00:00",
  },
  {
    pool_id: 4001,
    cardPoolType: 5,
    name: "Beginner",
    startDate: "2024-12-01 00:00",
    endDate: "2222-12-01 00:00",
  },
]

const targetedBanners: BannerInfo[] = [
  {
    pool_id: 1031001,
    cardPoolType: 3,
    name: "Featured Character",
    startDate: "2024-12-03 20:00",
    endDate: "2024-12-26 11:00",
    // Suomi
    rateUp5Ids: [1039],
    // Nemesis, Cheeta, Colphne
    rateUp4Ids: [1008, 1024, 1009, 1017],
  },
  {
    pool_id: 1032001,
    cardPoolType: 4,
    name: "Featured Weapon",
    startDate: "2024-12-03 20:00",
    endDate: "2024-12-26 11:00",
    // Unspoken Calling
    rateUp5Ids: [10393],
    // Suomi, .380 Curca, OTs-14
    rateUp4Ids: [10392, 11015, 11023],
  },
  {
    pool_id: 1033001,
    cardPoolType: 3,
    name: "Featured Character",
    startDate: "2024-12-03 20:00",
    endDate: "2024-12-26 11:00",
    // Ullrid
    rateUp5Ids: [1037],
    // Nemesis, Cheeta, Colphne
    rateUp4Ids: [1008, 1024, 1009],
  },
  {
    pool_id: 1034001,
    cardPoolType: 4,
    name: "Featured Weapon",
    startDate: "2024-12-03 20:00",
    endDate: "2024-12-26 11:00",
    // Rectrix
    rateUp5Ids: [10373],
    // Pluma Edge, .50 Nemesis, MP7H1
    rateUp4Ids: [10372, 11014, 11040],
  },
  {
    pool_id: 1023001,
    cardPoolType: 3,
    name: "Featured Character",
    startDate: "2024-12-26 13:00",
    endDate: "2025-01-15 22:59",
    // Makiatto
    rateUp5Ids: [1034],
    // Krolik, Sharkry
    rateUp4Ids: [1001, 1022],
  },
  {
    pool_id: 1024001,
    cardPoolType: 4,
    name: "Featured Weapon",
    startDate: "2024-12-26 13:00",
    endDate: "2025-01-15 22:59",
    // Bittersweet Caramel
    rateUp5Ids: [10343],
    // WA 2000, Hare, Robinson Modular Rifle
    rateUp4Ids: [10342, 11007, 11031],
  },
  {
    pool_id: 103001,
    cardPoolType: 3,
    name: "Featured Character",
    startDate: "2024-12-26 13:00",
    endDate: "2025-01-15 22:59",
    // Tololo
    rateUp5Ids: [1025],
    // Littara, Ksenia
    rateUp4Ids: [1038, 1036],
  },
  {
    pool_id: 102001,
    cardPoolType: 4,
    name: "Featured Weapon",
    startDate: "2024-12-26 13:00",
    endDate: "2025-01-15 22:59",
    // Planeta
    rateUp5Ids: [11038],
    // Model Alpha, Model ARM, Stechkin
    rateUp4Ids: [11037, 10382, 10362],
  },
]

export const banners: BannerInfo[] = [...standardBanners, ...targetedBanners]

/**
 * Constants
 */
export const BANNER_IDS: CardPoolTypeEnum[] = [1, 5, 3, 4]
export const FEATURED_BANNERS: BannerInfo[] = banners.filter(b => [3, 4].includes(b.cardPoolType))
export const POOL_IDS: number[] = banners.map(b => b.pool_id)
