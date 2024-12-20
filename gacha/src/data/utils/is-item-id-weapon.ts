import { weapons } from "../weapons"

// Function to check if the given id corresponds to a weapon
export function isItemIdWeapon(id: number): boolean {
  return weapons.some(weapon => weapon.id === id)
}
