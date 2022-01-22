import { OperationRecorder } from "@/utils/algorithms/visualize-tools/operation-recorder";
import { exch, less as _less } from "./../../algorithms/sort/sort-utils";
import { CompareFunction } from "./../../algorithms/types";

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
  private recorder: OperationRecorder | undefined;

  constructor(
    source: T[],
    less: CompareFunction = _less,
    recorder?: OperationRecorder
  ) {
    this.a = source;
    this.N = this.a.length - 1;
    this.less = less;
    this.recorder = recorder;
  }

  private swim(k: number) {
    while (k > 1 && this.less(this.a, Math.round(k / 2), k, this.recorder)) {
      exch(this.a, k, Math.round(k / 2), this.recorder);
      k = Math.round(k / 2);
    }
  }

  private sink(k: number) {
    while (2 * k <= this.N) {
      let j = k * 2;
      if (j < this.N && this.less(this.a, k, j, this.recorder)) j++;
      if (!this.less(this.a, k, j, this.recorder)) break;
      exch(this.a, k, j, this.recorder);
      k = j;
    }
  }

  public insert(x: T) {
    this.a.push(x);
    this.N++;
    this.swim(this.N);
  }

  public deleteMax() {
    const max = this.a[1];
    exch(this.a, 1, this.N--);
    this.sink(1);
    return this.a.pop();
  }
}
