import { useHeapSort } from "./HeapSort";
import { useQuickSort } from "./Quick";
import { useMergePlusSort } from "./MergePlus";
import { useMergeSort } from "./Merge";
import { useSelectionSort } from "./Selection";
import { useInsertionSort } from "./Insertion";
import { useShellSort } from "./Shell";
import { OperationRecorder } from "../visualize-tools/operation-recorder";
import { useShuffle } from "../shuffle/Shuffle";
import { SortFunction } from "../types";

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
  _less: (
    a: T[],
    i: number,
    j: number,
    recorder?: OperationRecorder
  ) => boolean = less,
  recorder?: OperationRecorder
) => {
  let boolean = true;
  for (let k = i; k < j - i - 1 && boolean; k++) {
    const isLess = !_less(source, k, k + 1, recorder);
    if (isLess) boolean = false;
  }
  return boolean;
};

export const exch = <T>(
  source: T[],
  i: number,
  j: number,
  recorder?: OperationRecorder
) => {
  const temp = source[j];
  source[j] = source[i];
  source[i] = temp;
  recorder?.record({
    name: "exch",
    function: exch,
    args: [source, i, j],
    cost: 2,
    operateTime: Date.now(),
  });
};
export const less = <T>(
  source: T[],
  i: number,
  j: number,
  recorder?: OperationRecorder
) => {
  recorder?.record({
    name: "less",
    function: less,
    args: [source, i, j],
    cost: 1,
    operateTime: Date.now(),
  });
  return source[i] < source[j];
};
export const copy = <T>(
  source: T[],
  target: T[],
  i: number,
  j: number,
  recorder?: OperationRecorder
) => {
  for (let k = i; k < j; k++) {
    target[k] = source[k];
  }
  recorder?.record({
    name: "copy",
    function: copy,
    args: [source, target, i, j],
    cost: 1,
    operateTime: Date.now(),
  });
};
export const setter = <T>(
  target: T[],
  i: number,
  source: T[],
  j: number,
  recorder?: OperationRecorder
) => {
  target[i] = source[j];
  recorder?.record({
    name: "setter",
    function: setter,
    args: [target, i, source, j],
    cost: 2,
    operateTime: Date.now(),
  });
};
