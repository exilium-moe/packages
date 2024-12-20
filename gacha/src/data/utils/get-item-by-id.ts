import { isItemIdCharacter } from "./is-item-id-character"
import type { Character } from "../../types/Character"
import type { Weapon } from "../../types/Weapon"
import { characters } from "../characters"
import { weapons } from "../weapons"

export function getItemById(id: number): Weapon | Character {
  if (isItemIdCharacter(id)) {
    return characters.find(c => c.id === id)!
  } else {
    return weapons.find(w => w.id === id)!
  }
}
