import { __copy, __less, __setter } from "./../manipulations/manipulations";
import { useInsertionSort } from "./Insertion";
import { ManipulationRecorder } from "../visualize-tools/manipulation-recorder";
import { CompareFunction } from "../types";
import { isSorted } from "./sort-utils";

/**
 * use Merge sort to sort a array of comparables.
 * @param unSorted the array wait to be sorted.
 * @param less compare function determine the smaller one of two elements..
 * @param operations array to record operations.
 * @returns {T[]} sorted array.
 */
export const useMergePlusSort = <T>(
  unSorted: T[],
  less: CompareFunction = __less,
  start?: number,
  end?: number,
  recorder?: ManipulationRecorder
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
  recorder?: ManipulationRecorder
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
  recorder?: ManipulationRecorder
) => {
  __copy(aux, source, start, end, recorder);
  let i = start;
  let j = mid;
  while (i < mid || j < end) {
    const curr = i + j - mid;
    if (i >= mid) {
      __setter(source, aux, curr, j++, recorder);
    } else if (j >= end) {
      __setter(source, aux, curr, i++, recorder);
    } else if (less(aux, i, j, recorder)) {
      __setter(source, aux, curr, i++, recorder);
    } else if (!less(aux, i, j, recorder)) {
      __setter(source, aux, curr, j++, recorder);
    }
  }
};
