import { Engine, PointsCloudSystem, Scene } from "@babylonjs/core";

export interface dataUnit {
  [index: string]: number | string;
}
export interface vec3 {
  x: number;
  y: number;
  z: number;
}

export interface color {
  readonly r: number;
  readonly g: number;
  readonly b: number;
}

export interface range {
  min: number;
  max: number;
}

export enum spreadMode {
  strict = "strict",
  expand = "expand",
  flat = "flat",
}

export interface domain {
  range?: range;
  interval?: number;
  groupMap?: Map<string, number>;
  groupKeys?: string[];
  groupValues?: dataUnit[][];
  groupLengths?: number[];
}

export enum mappingType {
  linear = "linear",
  discrete = "discrete",
  accumulate = "accumulate",
  stack = "stack",
}

export interface SceneInfo {
  scene: Scene | null;
  engine: Engine | null;
  ps: PointsCloudSystem | null;
}

export enum CoordSystem {
  Cartesian = "xyz",
  Spherical = "tpr",
  Cylindrical = "trz",
}
