import axios from "axios";
import { z } from "zod";
import { BASE_URLS } from "@exilium-moe/shared/config/base-urls";
import { type Weapon, WeaponSchema } from "@exilium-moe/shared/types/Weapon";

export class WeaponService {
  private static axiosClient = axios.create({
    baseURL: BASE_URLS.EXILIUM_CDN,
  });

  private static cache: Weapon[] | null = null;

  public static async getAll(): Promise<Weapon[]> {
    if (WeaponService.cache) {
      return WeaponService.cache;
    }

    const { data } = await WeaponService.axiosClient.get(
      "/static/database/weapon.json"
    );
    WeaponService.cache = z.array(WeaponSchema).parse(data);

    return WeaponService.cache;
  }

  public static async getById(id: number): Promise<Weapon | undefined> {
    if (!WeaponService.cache) {
      await WeaponService.getAll(); // Load items if not cached
    }

    const item = WeaponService.cache!.find((i) => i.id === id);

    return item;
  }
}
