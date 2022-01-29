import { ManipulationRecorder } from "./visualize-tools/manipulation-recorder";

export interface OperationRecord {
  name: string;
  function: (...args: any[]) => void;
  args: any[];
  hasEffect?: boolean;
  cost?: number;
  manipulateTime?: number;
  playedTime?: number;
}

export interface CompareFunction {
  <T>(
    source: T[],
    i: number,
    j: number,
    recorder?: ManipulationRecorder
  ): boolean;
}

export interface SortFunction {
  <T>(
    source: T[],
    less?: CompareFunction,
    start?: number,
    end?: number,
    recorder?: ManipulationRecorder
  ): T[];
}
