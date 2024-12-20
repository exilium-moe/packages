import { characters } from "../characters"

// Function to check if the given id corresponds to a character
export function isItemIdCharacter(id: number): boolean {
  return characters.some(character => character.id === id) || String(id).length === 4
}
