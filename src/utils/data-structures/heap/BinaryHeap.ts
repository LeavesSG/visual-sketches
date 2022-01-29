import { __exch, __less } from "@/utils/algorithms/manipulations/manipulations";
import { ManipulationRecorder } from "@/utils/algorithms/visualize-tools/manipulation-recorder";
import { CompareFunction } from "../../algorithms/types";

/**
 * @class Inplementation of binary heap
 * @function swim (k:number)=>void
 * @function sink (k:number)=>void
 * @function deleteMax ()=>T
 */
export class BinaryHeap<T> {
  private a: T[];
  private N: number;
  private less: CompareFunction;
  private recorder: ManipulationRecorder | undefined;

  constructor(
    source: T[],
    less: CompareFunction = __less,
    start?: number,
    end?: number,
    recorder?: ManipulationRecorder
  ) {
    this.a = source.slice(start, end);
    this.N = this.a.length - 1;
    if (end && start) this.N = end - start - 1;
    this.less = less;
    this.recorder = recorder;
    if (this.recorder) this.recorder.validateTarget(this.a, "sorting-base");
    this.heapOrder();
  }

  private getParent(k: number) {
    return Math.floor((k - 1) / 2);
  }

  private getFirstChild(k: number) {
    return 2 * k + 1;
  }

  private swim(k: number) {
    while (k > 0 && this.less(this.a, this.getParent(k), k, this.recorder)) {
      __exch(this.a, k, this.getParent(k), this.recorder);
      k = this.getParent(k);
    }
  }

  private sink(k: number) {
    while (this.getFirstChild(k) <= this.N) {
      let j = this.getFirstChild(k);
      if (j < this.N && this.less(this.a, j, j + 1, this.recorder)) j++;
      if (this.less(this.a, j, k, this.recorder)) break;
      __exch(this.a, k, j, this.recorder);
      k = j;
    }
  }

  public insert(x: T) {
    this.a.push(x);
    this.N++;
    this.swim(this.N);
  }

  public deleteMax() {
    __exch(this.a, 0, this.N--, this.recorder);
    this.sink(0);
    return this.a.pop();
  }

  public heapOrder() {
    for (let i = this.N; i >= 0; i--) {
      if (this.getFirstChild(i) <= this.N) {
        this.sink(i);
      }
    }
  }

  public getHeapArray() {
    return this.a;
  }
}
