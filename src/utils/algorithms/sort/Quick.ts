import { useInsertionSort } from "./Insertion";
import { __exch, __less } from "./../manipulations/manipulations";
import { useShuffle } from "../shuffle/Shuffle";
import { CompareFunction } from "./../types";
import { ManipulationRecorder } from "../visualize-tools/manipulation-recorder";
import { isSorted } from "./sort-utils";

/**
 * use Quick sort to sort a array of comparables.
 * @param unSorted the array wait to be sorted.
 * @param less compare function determine the smaller one of two elements..
 * @param operations array to record operations.
 * @returns {Comparable[]} sorted array.
 */
export const useQuickSort = <T>(
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
  recorder?: ManipulationRecorder
) => {
  if (j - i <= 7) {
    useInsertionSort(a, less, i, j, recorder);
    return;
  }
  const mid = partition(a, i, j, less, recorder);
  sort(a, i, mid, less, recorder);
  sort(a, mid + 1, j, less, recorder);
};

const partition = <T>(
  a: T[],
  i: number,
  j: number,
  less: CompareFunction,
  recorder?: ManipulationRecorder
) => {
  const mid = findMid(a, i, j - 1, less, recorder);
  __exch(a, i, mid, recorder);
  let m = i;
  let n = j;
  while (true) {
    while (less(a, ++m, i, recorder)) if (m === j - 1) break;
    while (less(a, i, --n, recorder)) if (n === i) break;
    if (m >= n) break;
    __exch(a, m, n, recorder);
  }
  __exch(a, i, n, recorder);

  return n;
};

const findMid = <T>(
  a: T[],
  i: number,
  j: number,
  less: CompareFunction,
  recorder?: ManipulationRecorder
) => {
  const lessIJ = less(a, i, j, recorder) ? i : j;
  const another = lessIJ === i ? j : i;
  if (j - i <= 2) return lessIJ;
  else {
    const mid = Math.floor((i + j) / 2);
    if (less(a, lessIJ, mid, recorder)) {
      return less(a, another, mid, recorder) ? another : mid;
    }
    return lessIJ;
  }
};
