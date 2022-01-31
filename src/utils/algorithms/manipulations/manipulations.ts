import { ManipulationRecorder } from "../visualize-tools/manipulation-recorder";

export enum ArrayAcessType {
  GETTER = "Access Array Value",
  SETTER = "Set Array Value",
}

// global variables
let activeEntry = "";
let isKeyFrame = false;

const __array_getter = <T>(
  target: T[],
  index: number,
  recorder?: ManipulationRecorder
) => {
  if (recorder) {
    recorder.validateFunction(ArrayAcessType.GETTER, __array_getter);
    const targets = [recorder.validateTarget(target)];
    recorder.record(
      __generate_default_record(
        ArrayAcessType.GETTER,
        activeEntry,
        targets,
        [index],
        !isKeyFrame
      )
    );
  }
  return target[index];
};

const __array_setter = <T>(
  target: T[],
  index: number,
  value: T,
  recorder?: ManipulationRecorder
) => {
  if (recorder) {
    recorder.validateFunction(ArrayAcessType.SETTER, __array_setter);
    const targets = [recorder.validateTarget(target)];
    recorder.record(
      __generate_default_record(
        ArrayAcessType.SETTER,
        activeEntry,
        targets,
        [index, value],
        !isKeyFrame
      )
    );
  }
  target[index] = value;
};

export interface ManipulationRecord {
  func: ArrayAcessType; // array access types, GETTER | SETTER
  entry: string; // larger manipulation entries, __less | __exch etc.
  cost: number; // cost of manipulation
  targets: string[]; // target array of the manipulation
  args: (number | string | any)[]; // manipulation arguements
  inComplete: boolean;
}

const __generate_default_record = (
  type: ArrayAcessType,
  entry: string,
  targets: string[],
  args: (string | number | any)[],
  inComplete = true
) => {
  return {
    func: type,
    entry: entry,
    targets: targets,
    cost: 1,
    args: args,
    inComplete: inComplete,
  };
};

export const __exch = <T>(
  target: T[],
  i: number,
  j: number,
  recorder?: ManipulationRecorder
) => {
  activeEntry = "exch";
  const tempA = __array_getter(target, i, recorder);
  const tempB = __array_getter(target, j, recorder);
  __array_setter(target, i, tempB, recorder);
  isKeyFrame = true;
  __array_setter(target, j, tempA, recorder);
  isKeyFrame = false;
};
export const __less = <T>(
  target: T[],
  i: number,
  j: number,
  recorder?: ManipulationRecorder
) => {
  activeEntry = "less";
  isKeyFrame = true;
  const isLess =
    __array_getter(target, i, recorder) < __array_getter(target, j, recorder);
  isKeyFrame = false;
  return isLess;
};

export const __copy = <T>(
  target: T[],
  source: T[],
  i: number,
  j: number,
  recorder?: ManipulationRecorder
) => {
  activeEntry = "copy";
  for (let k = i; k < j; k++) {
    __array_setter(target, k, __array_getter(source, k, recorder), recorder);
  }
};
export const __setter = <T>(
  target: T[],
  source: T[],
  i: number,
  j: number,
  recorder?: ManipulationRecorder
) => {
  activeEntry = "set";
  isKeyFrame = true;
  __array_setter(target, i, __array_getter(source, j, recorder), recorder);
  isKeyFrame = false;
};
