import { __exch, __less } from "./../manipulations/manipulations";
import { CompareFunction } from "../types";
import { ManipulationRecorder } from "../visualize-tools/manipulation-recorder";
import { isSorted } from "./sort-utils";

/**
 * use Insertion sort to sort a array of comparables.
 * @param unSorted the array wait to be sorted.
 * @param less compare function determine the smaller one of two elements..
 * @param operations array to record operations.
 * @returns {Comparable[]} sorted array.
 */
export const useInsertionSort = <T>(
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
    console.error("Insertion Sort: Compare function invalid!");
    return unSorted;
  }

  // main loop
  for (let i = S; i < N; i++) {
    for (let j = i; j > S && less(a, j, j - 1, recorder); j--) {
      __exch(a, j, j - 1, recorder);
    }
  }

  isSorted(a, S, N, less, recorder);
  return a;
};
