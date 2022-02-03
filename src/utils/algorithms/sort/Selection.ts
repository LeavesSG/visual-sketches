import { __exch, __less } from "./../manipulations/manipulations";
import { CompareFunction } from "../types";
import { ManipulationRecorder } from "../visualize-tools/manipulation-recorder";
import { isSorted } from "./sort-utils";

/**
 * use Selection sort to sort a array of comparables.
 * @param unSorted the array wait to be sorted.
 * @param less compare function determine the smaller one of two elements..
 * @param operations array to record operations.
 * @returns {Comparable[]} sorted array.
 */
export const useSelectionSort = <T>(
  unSorted: T[],
  less: CompareFunction = __less,
  start?: number,
  end?: number,
  recorder?: ManipulationRecorder
): T[] => {
  const a = unSorted;
  const S = start || 0;
  const N = end || a.length;

  // return if array too short or lack of valid compare function.
  if (unSorted.length < 2) return unSorted;
  if (less(unSorted, S, S + 1) === less(unSorted, S + 1, S)) {
    console.error("Selection Sort: Invalid compare function!");
    return unSorted;
  }

  // main loop
  for (let i = S; i < N; i++) {
    let min = i;
    for (let j = i + 1; j < N; j++) {
      const isLess = less(a, j, min, recorder);
      if (isLess) min = j;
    }
    __exch(a, i, min, recorder);
  }

  isSorted(a, S, N, less, recorder);
  return a;
};
