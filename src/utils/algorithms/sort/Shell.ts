import { __exch, __less } from "./../manipulations/manipulations";
import { CompareFunction } from "../types";
import { ManipulationRecorder } from "../visualize-tools/manipulation-recorder";
import { isSorted } from "./sort-utils";

/**
 * use Shell sort to sort a array of comparables.
 * @param unSorted the array wait to be sorted.
 * @param less compare function determine the smaller one of two elements..
 * @param operations array to record operations.
 * @returns {Comparable[]} sorted array.
 */
export const useShellSort = <T>(
  unSorted: T[],
  less: CompareFunction = __less,
  start?: number,
  end?: number,
  recorder?: ManipulationRecorder
): T[] => {
  const a = unSorted;
  const S = start || 0;
  const N = end || a.length;

  // return if only one element
  if (unSorted.length < 2) return unSorted;
  if (less(unSorted, S, S + 1) === less(unSorted, S + 1, S)) {
    console.error("Shell Sort: Compare function invalid!");
    return unSorted;
  }

  let h = 1;
  while (h < (N - S) / 3) h = h * 3 + 1;
  while (h >= 1) {
    for (let i = S + h; i < N; i++) {
      for (let j = i; j >= h && less(a, j, j - h, recorder); j -= h) {
        __exch(a, j, j - h, recorder);
      }
    }
    h = Math.floor(h / 3);
  }
  // main loop
  isSorted(a, S, N, less, recorder);
  return a;
};
