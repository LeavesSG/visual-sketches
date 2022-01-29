import { __exch } from "../manipulations/manipulations";
import { CompareFunction } from "../types";
import { ManipulationRecorder } from "../visualize-tools/manipulation-recorder";

export const useShuffle = <T>(
  source: T[],
  _less?: CompareFunction,
  start?: number,
  end?: number,
  recorder?: ManipulationRecorder
) => {
  const a = source;
  const S = start || 0;
  const N = end || a.length;
  for (let i = S; i < N; i++) {
    const randomInt = Math.floor(Math.random() * (i - S)) + S;
    __exch(a, i, randomInt, recorder);
  }
  return a;
};
