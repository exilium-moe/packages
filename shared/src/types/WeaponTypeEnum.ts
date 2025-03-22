import { z } from "zod";

// from `type` property, verify via GunWeaponByTypeData.json
// https://github.com/torikushiii/GFL2Data/blob/cf20ee3eda71e5a853a4857e63079e0b5ef102e0/tables/GunWeaponByTypeData.json
export enum WeaponTypeEnum {
  HG = 1, // Pistol
  SMG = 2, // Submachine Gun
  RF = 3, // Sniper
  AR = 4, // Rifle
  MG = 5, // Machine Gun
  SG = 6, // Shotgun
  BLD = 7, // Blade
}

export const WeaponTypeEnumSchema = z.nativeEnum(WeaponTypeEnum);

export type WeaponTypeEnumType = z.infer<typeof WeaponTypeEnumSchema>;
