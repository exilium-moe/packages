import type { PullWithNumber } from "../../types/PullWithNumber";
import type { ServerEnum } from "@exilium-moe/shared/types/ServerEnum";
import { unixToIsoString } from "../unix-to-iso-string";
import type { PullForDb } from "../../types/PullForDb";
import { convertPullsToPullsWithNumbers } from "./convert-pulls-to-pulls-with-numbers";

export const convertPullsToPullsForDb = (
  {
    pulls,
    uid,
    server,
  }: {
    pulls: PullWithNumber[];
    uid: number;
    server: ServerEnum;
  },
  previousPity4: number,
  previousPity5: number
): PullForDb[] => {
  function convertPullsWithNumbersToPullsForDb({
    pulls,
    uid,
    server,
  }: {
    pulls: PullWithNumber[];
    uid: number;
    server: ServerEnum;
  }): PullForDb[] {
    return pulls.map((pull) => {
      return {
        ...pull,
        uid,
        server,
        isSorted: pull.isSorted ? true : false,
        time: unixToIsoString(pull.time),
      };
    });
  }

  const pullsToInsert = convertPullsToPullsWithNumbers(
    pulls,
    previousPity4,
    previousPity5
  );

  return convertPullsWithNumbersToPullsForDb({
    pulls: pullsToInsert,
    uid,
    server,
  });
};
