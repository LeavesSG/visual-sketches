import { BinaryHeap } from "./../../data-structures/heap/BinaryHeap";
import { CompareFunction, SortFunction } from "../types";
import { OperationRecorder } from "../visualize-tools/operation-recorder";
import { exch, isSorted, less as utilsLess } from "./sort-utils";

/**
 * use Heap sort to sort a array of comparables.
 * @param unSorted the array wait to be sorted.
 * @param less compare function determine the smaller one of two elements..
 * @param operations array to record operations.
 * @returns {Comparable[]} sorted array.
 */
export const useHeapSort = <T>(
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
    console.error("Heap Sort: Compare function invalid!");
    return unSorted;
  }

  const heap = new BinaryHeap(a, less, S, N, recorder);
  console.log(heap.getHeapArray());
  for (let i = N - 1; i >= S; i--) {
    const max = heap.deleteMax();
    if (max) a[i] = max;
  }

  isSorted(a, S, N, less, recorder);
  return a;
};
