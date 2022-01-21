import { CompareFunction } from "./../types";
import { OperationRecorder } from "./../visualize-tools/operation-recorder";
import { OperationRecord } from "../types";
import { exch } from "../sort/sort-utils";

export const useShuffle = <T>(
  source: T[],
  less?: CompareFunction,
  start?: number,
  end?: number,
  recorder?: OperationRecorder
) => {
  debugger;
  const a = source;
  const S = start || 0;
  const N = end || a.length;
  for (let i = S; i < N; i++) {
    const randomInt = Math.floor(Math.random() * (i - S)) + S;
    exch(a, i, randomInt, recorder);
  }
  return a;
};
