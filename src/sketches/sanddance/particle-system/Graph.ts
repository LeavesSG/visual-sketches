import {
  UVCounter,
  AxisName,
  dataUnit,
  mappingType,
  range,
  vec3,
} from "./../SandDance";
import { Axis } from "./Axis";
import { _get } from "./SETTING";
import Unit from "./Unit";

export class Graph3D {
  private zero = { x: 0, y: 0, z: 0 };
  private xAxis = new Axis(
    AxisName.x,
    this.zero,
    -50,
    50,
    1,
    mappingType.linear
  );
  private yAxis = new Axis(
    AxisName.y,
    this.zero,
    -50,
    50,
    1,
    mappingType.linear
  );
  private zAxis = new Axis(
    AxisName.z,
    this.zero,
    -50,
    50,
    1,
    mappingType.linear
  );
  private thetaAxis = new Axis(
    AxisName.t,
    this.zero,
    0,
    Math.PI * 2,
    1,
    mappingType.stack
  );
  private phiAxis = new Axis(
    AxisName.p,
    this.zero,
    0,
    Math.PI,
    1,
    mappingType.linear
  );
  private rAxis = new Axis(
    AxisName.r,
    this.zero,
    20,
    40,
    1,
    mappingType.linear
  );
  public dataset: dataUnit[] = [];
  public fillType = "random";

  public axes = new Map<string, Axis>([
    ["x", this.xAxis],
    ["y", this.yAxis],
    ["z", this.zAxis],
    ["t", this.thetaAxis],
    ["p", this.phiAxis],
    ["r", this.rAxis],
  ]);

  public useAxes: Axis[] = ["x", "y", "z"].map((e) => this.axes.get(e) as Axis);

  public areaGrouper = new Map<string, UVCounter>();

  useAxesString(): string {
    return this.useAxes.map((e) => e.name).join("");
  }

  checkAxisValidate(...axes: Axis[]): boolean {
    const useAxesString = axes.map((e) => e.name).join("");
    const validates = _get("VALID_AXES");
    if (Array.isArray(validates)) {
      return validates.includes(useAxesString);
    }
    return false;
  }

  isAxisActive(axisName: AxisName): boolean {
    return this.useAxesString().includes(axisName);
  }

  setUsingAxes(...axes: Axis[]): void {
    if (this.checkAxisValidate(...axes)) this.useAxes = axes;
    this.bindDataset();
  }

  locateUnit(unit: Unit): vec3 {
    const [sin, cos] = [Math.sin, Math.cos];
    const validate = (num: number | undefined) => {
      if (num === undefined) return Infinity;
      return Number.isNaN(num) ? Infinity : num;
    };
    const x = validate(unit.onAxisValue.get("x"));
    const y = validate(unit.onAxisValue.get("y"));
    const z = validate(unit.onAxisValue.get("z"));
    const t = validate(unit.onAxisValue.get("t"));
    const p = validate(unit.onAxisValue.get("p"));
    const r = validate(unit.onAxisValue.get("r"));
    switch (this.useAxesString()) {
      case "xyz":
        return { x, y, z };
      case "tpr":
        return {
          x: cos(t) * sin(p) * r,
          y: sin(t) * sin(p) * r,
          z: r * cos(p),
        };
      case "trz":
        return {
          x: cos(t) * r,
          y: sin(t) * r,
          z: z,
        };
      default:
        return { x: 0, y: 0, z: 0 };
    }
  }

  bindDataset(): void {
    this.axes.forEach((e) => e.setBindDataset(this.dataset));
  }

  randomFill(unit: Unit): void {
    unit.OnAxisRange.forEach((value, key) => {
      const randomValue = Math.random() * (value.max - value.min) + value.min;
      unit.onAxisValue.set(key, randomValue);
    });
  }

  getAreaKey(unit: Unit): string {
    return this.useAxes
      .map((axis) => {
        const image = unit.OnAxisRange.get(axis.name);
        return `${axis.name} in (${image?.max.toFixed(5)}, ${image?.min.toFixed(
          5
        )})__`;
      })
      .join("");
  }

  groupAllArea(unitArray: Unit[]): void {
    this.areaGrouper = new Map();
    let areaKey: string;
    // group areas and count
    unitArray.forEach((unit) => {
      areaKey = this.getAreaKey(unit);
      const counter = this.areaGrouper.get(areaKey);
      if (!counter) {
        const temp: UVCounter = {
          count: 1,
          max: [0, 0, 0],
          slices: [0, 0, 0],
          UVRanges: [
            { min: 0, max: 0 },
            { min: 0, max: 0 },
            { min: 0, max: 0 },
          ],
          dirty: true,
        };
        this.areaGrouper.set(areaKey, temp);
      } else {
        counter.count++;
      }
    });
    // calculate UV range, slice count
    unitArray.forEach((unit) => {
      areaKey = this.getAreaKey(unit);
      const counter = this.areaGrouper.get(areaKey);
      if (counter?.dirty) {
        const ranges = this.useAxes.map((axis, index) => {
          const image = unit.OnAxisRange.get(axis.name);
          if (image) {
            const UVRange = this.cardToUV(
              { min: image.min, max: image.max },
              axis.codomain,
              axis.name
            );
            return UVRange;
          }
        });
        const sizes = ranges.map((range) => {
          if (range) return range.max - range.min;
          return 0;
        });
        const validateAxesCount = sizes.filter(Boolean).length;
        const validateSize = sizes.reduce((a, c) => {
          return (c || 1) * (a || 1);
        }, 0);
        if (validateSize) {
          const coefficient = Math.pow(
            counter.count / validateSize,
            1 / validateAxesCount
          );
          ranges.forEach((range, index) => {
            debugger;
            if (range) counter.UVRanges[index] = range;
            if (sizes[index]) {
              const max = Math.ceil(sizes[index] * coefficient);
              counter.max[index] = max;
              counter.slices[index] = sizes[index] / max;
            } else {
              counter.max[index] = 1;
              counter.slices[index] = 0;
            }
          });
          counter.count = 0;
          counter.dirty = false;
        }
      }
    });
  }

  linearFill(range: range, slice: number, index: number): number {
    return range.min + slice * index;
  }

  cardToUV(range: range, codomain: range, axisName: AxisName): range {
    const size = codomain.max - codomain.min;
    return {
      min: (range.min - codomain.min) / size,
      max: (range.max - codomain.min) / size,
    };
  }

  uvToCard(finalUV: number, codomain: range, axisName: AxisName): number {
    const size = codomain.max - codomain.min;
    return codomain.min + size * finalUV;
  }

  counterToUVW(
    index: number,
    uMax: number,
    vMax: number,
    wMax: number
  ): [number, number, number] {
    const S = uMax * vMax;
    const u = index % uMax;
    const w = Math.floor(index / S);
    const v = Math.floor((index - w * S) / uMax);
    return [u, v, w];
  }

  evenlyFill(unit: Unit): void {
    debugger;
    const areaKey = this.getAreaKey(unit);
    const counter = this.areaGrouper.get(areaKey);
    if (counter) {
      const UVs = this.counterToUVW(counter.count, ...counter.max);
      this.useAxes.forEach((axis, index) => {
        debugger;
        const image = unit.OnAxisRange.get(axis.name);
        if (image) {
          const finalUV = this.linearFill(
            counter.UVRanges[index],
            counter.slices[index],
            UVs[index]
          );
          const finalValue = this.uvToCard(finalUV, axis.codomain, axis.name);
          unit.onAxisValue.set(axis.name, finalValue);
        }
      });
      counter.count++;
    }
  }
}
