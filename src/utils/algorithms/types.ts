import { OperationRecorder } from "./visualize-tools/operation-recorder";

export interface OperationRecord {
  name: string;
  function: (...args: any[]) => void;
  args: any[];
  hasEffect?: boolean;
  cost?: number;
  operateTime?: number;
  playedTime?: number;
}

export interface CompareFunction {
  <T>(source: T[], i: number, j: number, recorder?: OperationRecorder): boolean;
}

export interface SortFunction {
  <T>(
    source: T[],
    less?: CompareFunction,
    start?: number,
    end?: number,
    recorder?: OperationRecorder
  ): T[];
}
