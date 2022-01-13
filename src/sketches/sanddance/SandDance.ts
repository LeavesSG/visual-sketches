import { Engine, PointsCloudSystem, Scene } from "@babylonjs/core";

export interface dataUnit {
  [index: string]: number | string;
}
export interface vec3 {
  x: number;
  y: number;
  z: number;
}

export enum AxisName {
  x = "x",
  y = "y",
  z = "z",
  t = "t",
  p = "p",
  r = "r",
  c = "c",
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

export interface image extends range {
  min: number;
  max: number;
  length: number;
  axisName: string;
}

export interface domain {
  axisName: string;
  range: range;
  groupedInfo: groupedInfo;
}

export interface groupedInfo {
  keys: string[];
  lengths: number[];
  mappings: mappingType[];
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

export interface UVCounter {
  count: number;
  max: [number, number, number];
  UVRanges: [range, range, range];
  slices: [number, number, number];
  dirty: boolean;
}

export function generateID(): string {
  return Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");
}
