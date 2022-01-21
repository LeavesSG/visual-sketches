import { OperationRecord } from "../types";

export class OperationRecorder {
  private records: OperationRecord[] = [];

  record(operation: OperationRecord) {
    this.records.push(operation);
  }

  play() {
    return this.records.shift();
  }

  reset() {
    this.records = [];
  }

  hasNext() {
    return this.records.length > 0;
  }

  getEarliestTime() {
    return this.records[0]?.operateTime;
  }
}
