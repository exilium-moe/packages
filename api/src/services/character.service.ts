import axios from "axios";
import { z } from "zod";
import { BASE_URLS } from "@exilium-moe/shared/config/base-urls";
import {
  type Character,
  CharacterSchema,
} from "@exilium-moe/shared/types/Character";

export class CharacterService {
  private static axiosClient = axios.create({
    baseURL: BASE_URLS.EXILIUM_CDN,
  });

  private static cache: Character[] | null = null;

  public static async getAll(): Promise<Character[]> {
    if (CharacterService.cache) {
      return CharacterService.cache;
    }

    const { data } = await CharacterService.axiosClient.get(
      "/static/database/character.json"
    );
    CharacterService.cache = z.array(CharacterSchema).parse(data);

    return CharacterService.cache;
  }

  public static async getById(id: number): Promise<Character | undefined> {
    if (!CharacterService.cache) {
      await CharacterService.getAll(); // Load items if not cached
    }

    const item = CharacterService.cache!.find((i) => i.id === id);

    return item;
  }
}
