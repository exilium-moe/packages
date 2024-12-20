import { pgTable, text, smallint, integer, primaryKey, foreignKey, index, boolean } from "drizzle-orm/pg-core"
import type { RarityEnum } from "@exilium-moe/gacha/types/RarityEnum"
import type { CardPoolTypeEnum } from "@exilium-moe/gacha/types/CardPoolTypeEnum"

export const users = pgTable(
  "users",
  {
    server: text("server").notNull(),
    uid: integer("uid").notNull(),
  },
  table => [primaryKey({ columns: [table.server, table.uid] })],
)

export type SelectUser = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert

export const pulls = pgTable(
  "pulls",
  {
    server: text("server").notNull(),
    uid: integer("uid").notNull(),
    cardPoolType: smallint("cardPoolType").$type<CardPoolTypeEnum>().notNull(),
    pool_id: integer("pool_id").notNull(),
    item: integer("item").notNull(),
    rarity: text("rarity").$type<RarityEnum>().notNull(),
    time: text("time").notNull(), // ISO 8601 format from Unix
    num: integer("num").notNull(), // the pull number
    p4: smallint("p4").notNull(), // 1 to 10
    p5: smallint("p5").notNull(), // 1 to 80
    isSorted: boolean("isSorted").notNull(), // isSorted
  },
  table => [
    primaryKey({
      columns: [table.server, table.uid, table.cardPoolType, table.num],
    }),

    foreignKey({
      columns: [table.server, table.uid],
      foreignColumns: [users.server, users.uid],
      name: "fk_pulls_users",
    }),

    // For querying the newest pull of the user in a specific cardPoolType
    index("idx_pulls_server_uid_pool_time").on(table.server, table.uid, table.cardPoolType, table.time.desc()),
  ],
)

export type SelectPull = typeof pulls.$inferSelect
export type InsertPull = typeof pulls.$inferInsert
