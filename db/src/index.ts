export * from "drizzle-orm"
export * as schema from "./schema"
import { drizzle } from "drizzle-orm/postgres-js"

export const createDbClient = (url: string) =>
  drizzle({
    connection: {
      url,
    },
  })
