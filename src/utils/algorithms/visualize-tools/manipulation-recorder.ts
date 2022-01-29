import { ManipulationRecord } from "../manipulations/manipulations";

enum usingStoreMedia {
  "none",
  "sessionStorage",
  "localStorage",
  "indexDB",
}

export class ManipulationRecorder {
  private records: ManipulationRecord[] = [];
  private storage: usingStoreMedia;
  private cursor = 0;
  private reverseCursor = 0;

  public usingTargets = new Map<string, any>();
  public usingFunctions = new Map<string, any>();

  constructor(media: usingStoreMedia = usingStoreMedia.none) {
    this.storage = media;
  }

  validateFunction(stringID: string, func: any) {
    if (!this.usingFunctions.has(stringID))
      this.usingFunctions.set(stringID, func);
  }

  validateTarget<T>(target: T, specificID?: string) {
    let id: string = "";
    this.usingTargets.forEach((t, tid) => {
      if (target === t) {
        id = tid;
      }
    });
    if (id) return id;
    else {
      debugger;
      id = specificID || `t${this.usingTargets.size}`;
      this.usingTargets.set(id, target);
      return id;
    }
  }

  getTarget(id: string) {
    return this.usingTargets.get(id);
  }

  record(...operations: ManipulationRecord[]) {
    switch (this.storage) {
      case usingStoreMedia.localStorage:
        operations.forEach((e, i) =>
          localStorage.setItem(`m${this.cursor + i}`, JSON.stringify(e))
        );
        break;
      default:
        this.records.push(...operations);
        break;
    }
    this.cursor += operations.length;
  }

  play(): ManipulationRecord | undefined {
    this.reverseCursor++;
    this.cursor--;
    switch (this.storage) {
      case usingStoreMedia.localStorage:
        const temp = localStorage.getItem(`m${this.reverseCursor - 1}`);
        localStorage.removeItem(`m${this.reverseCursor - 1}`);
        if (temp) return JSON.parse(temp);
      default:
        return this.records.shift();
    }
  }

  reset() {
    this.reverseCursor = 0;
    this.cursor = 0;
    this.usingTargets.clear();
    this.usingFunctions.clear();
    switch (this.storage) {
      case usingStoreMedia.localStorage:
        localStorage.clear();
      default:
        this.records = [];
    }
  }

  hasNext() {
    return this.cursor > 0;
  }

  getEarliestTime() {
    const cursor = 0;
    switch (this.storage) {
      case usingStoreMedia.localStorage:
        const first = localStorage.getItem(`m${cursor}`);
        if (first) {
          return JSON.parse(first).manipulateTime;
        }
      default:
        return this.records[cursor]?.manipulateTime;
    }
  }

  getLatestTime() {
    const cursor = this.cursor - 1;
    switch (this.storage) {
      case usingStoreMedia.localStorage:
        const first = localStorage.getItem(`m${cursor}`);
        if (first) {
          return JSON.parse(first).manipulateTime;
        }
      default:
        return this.records[cursor]?.manipulateTime;
    }
  }

  getTotalTimeCost() {
    return (this.getLatestTime() || 0) - (this.getEarliestTime() || 0);
  }

  getRecord() {
    switch (this.storage) {
      case usingStoreMedia.localStorage:
        return Array.from({ length: this.cursor }, (e, i) => {
          const result = localStorage.getItem(`m${i}`);
          if (result) return JSON.parse(result);
        });
      default:
        return [...this.records];
    }
  }
}
