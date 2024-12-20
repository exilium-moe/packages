import { default as slugifyLib } from "@sindresorhus/slugify"

export function slugify(str: string) {
  return slugifyLib(str)
}
