import { characters } from "../characters"
import { weapons } from "../weapons"

export function getSlugByItemId(itemId: number) {
  return characters.find(c => c.id === itemId)?.slug ?? weapons.find(c => c.id === itemId)?.slug ?? "NUL"
}
