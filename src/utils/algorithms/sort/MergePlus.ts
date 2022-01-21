import { useInsertionSort } from "./Insertion";
import { OperationRecorder } from "../visualize-tools/operation-recorder";
import { copy, exch, isSorted, less as utilsLess, setter } from "./sort-utils";
import { CompareFunction } from "../types";

/**
 * use Merge sort to sort a array of comparables.
 * @param unSorted the array wait to be sorted.
 * @param less compare function determine the smaller one of two elements..
 * @param operations array to record operations.
 * @returns {T[]} sorted array.
 */
export const useMergePlusSort = <T>(
  unSorted: T[],
  less: CompareFunction = utilsLess,
  start?: number,
  end?: number,
  recorder?: OperationRecorder
): T[] => {
  // variables
  const a = unSorted;
  const S = start || 0;
  const N = end || a.length;
  const aux: T[] = [];

  // return if only one element
  if (unSorted.length < 2) return unSorted;
  if (less(unSorted, S, S + 1) === less(unSorted, S + 1, S)) {
    console.error("Merge Sort: Compare function invalid!");
    return unSorted;
  }

  sort(a, S, N, aux, less, recorder);
  isSorted(a, S, N, less, recorder);
  return a;
};

const sort = <T>(
  source: T[],
  start: number,
  end: number,
  aux: T[],
  less: CompareFunction,
  recorder?: OperationRecorder
) => {
  if (end - start < 8) {
    useInsertionSort(source, less, start, end, recorder);
  } else {
    const mid = Math.floor((start + end) / 2);
    sort(source, start, mid, aux, less, recorder);
    sort(source, mid, end, aux, less, recorder);
    merge(source, start, mid, end, aux, less, recorder);
  }
};

export const merge = <T>(
  source: T[],
  start: number,
  mid: number,
  end: number,
  aux: T[],
  less: CompareFunction,
  recorder?: OperationRecorder
) => {
  copy(source, aux, start, end, recorder);
  let i = start;
  let j = mid;
  while (i < mid || j < end) {
    const curr = i + j - mid;
    if (i >= mid) {
      setter(source, curr, aux, j++, recorder);
    } else if (j >= end) {
      setter(source, curr, aux, i++, recorder);
    } else if (less(aux, i, j, recorder)) {
      setter(source, curr, aux, i++, recorder);
    } else if (!less(aux, i, j, recorder)) {
      setter(source, curr, aux, j++, recorder);
    }
  }
};
