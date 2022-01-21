import { CompareFunction } from "./../types";
import { OperationRecorder } from "../visualize-tools/operation-recorder";
import { exch, isSorted, less as utilsLess } from "./sort-utils";

/**
 * use Quick sort to sort a array of comparables.
 * @param unSorted the array wait to be sorted.
 * @param less compare function determine the smaller one of two elements..
 * @param operations array to record operations.
 * @returns {Comparable[]} sorted array.
 */
export const useQuickSort = <T>(
  unSorted: T[],
  less: CompareFunction = utilsLess,
  start?: number,
  end?: number,
  recorder?: OperationRecorder
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
        exch(a, j, j - h, recorder);
      }
    }
    h = Math.floor(h / 3);
  }
  // main loop
  isSorted(a, S, N, less, recorder);
  return a;
};

const partition = <T>(
  a: T[],
  i: number,
  j: number,
  less: CompareFunction,
  recorder: OperationRecorder
) => {};
