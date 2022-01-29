import { useHeapSort } from "./HeapSort";
import { useQuickSort } from "./Quick";
import { useMergePlusSort } from "./MergePlus";
import { useMergeSort } from "./Merge";
import { useSelectionSort } from "./Selection";
import { useInsertionSort } from "./Insertion";
import { useShellSort } from "./Shell";
import { ManipulationRecorder } from "../visualize-tools/manipulation-recorder";
import { useShuffle } from "../shuffle/Shuffle";
import { SortFunction, CompareFunction } from "../types";
import { __less } from "../manipulations/manipulations";

declare interface SortFunctionInfo {
  function: SortFunction;
  relativeVelocity: number;
  inPlace: boolean;
}

/**
 * @Map Dictionary that keep all the sorting methods.
 */
export const sortAlgsDict = new Map<string, SortFunctionInfo>([
  ["Shuffle", { function: useShuffle, relativeVelocity: 0, inPlace: true }],
  [
    "Selection",
    { function: useSelectionSort, relativeVelocity: 0.4, inPlace: true },
  ],
  [
    "Insertion",
    { function: useInsertionSort, relativeVelocity: 0.4, inPlace: true },
  ],
  ["Shell", { function: useShellSort, relativeVelocity: 2.5, inPlace: true }],
  ["Merge", { function: useMergeSort, relativeVelocity: 3, inPlace: false }],
  [
    "Merge+",
    { function: useMergePlusSort, relativeVelocity: 3.5, inPlace: false },
  ],
  ["Heap", { function: useHeapSort, relativeVelocity: 4, inPlace: true }],
  ["Quick", { function: useQuickSort, relativeVelocity: 4, inPlace: true }],
]);

export const isSorted = <T>(
  source: T[],
  i: number = 0,
  j: number = source.length,
  less: CompareFunction = __less,
  recorder?: ManipulationRecorder
) => {
  let boolean = true;
  for (let k = i; k < j - i - 1 && boolean; k++) {
    const isLess = !__less(source, k, k + 1, recorder);
    if (isLess) boolean = false;
  }
  return boolean;
};
