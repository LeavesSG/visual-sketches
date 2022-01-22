import { useShuffle } from "../shuffle/Shuffle";
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

  useShuffle(a, less, S, N, recorder);
  sort(a, S, N, less, recorder);

  // final check
  isSorted(a, S, N, less, recorder);
  return a;
};

const sort = <T>(
  a: T[],
  i: number,
  j: number,
  less: CompareFunction,
  recorder?: OperationRecorder
) => {
  if (j <= i) return;
  const mid = partition(a, i, j, less, recorder);
  sort(a, i, mid, less, recorder);
  sort(a, mid + 1, j, less, recorder);
};

const partition = <T>(
  a: T[],
  i: number,
  j: number,
  less: CompareFunction,
  recorder?: OperationRecorder
) => {
  let m = i;
  let n = j;
  while (true) {
    while (less(a, ++m, i, recorder)) if (m === j - 1) break;
    while (less(a, i, --n, recorder)) if (n === i) break;
    if (m >= n) break;
    exch(a, m, n, recorder);
  }
  exch(a, i, n, recorder);

  return n;
};
