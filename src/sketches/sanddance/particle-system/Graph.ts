import { dataUnit, mappingType, vec3 } from "@/sketches/sanddance/SandDance";
import { Axis } from "./Axis";
import { _get } from "./SETTING";
import Unit from "./Unit";

export class Graph3D {
  private zero = { x: 0, y: 0, z: 0 };
  private xAxis = new Axis("x", this.zero, -50, 50, 1, mappingType.linear);
  private yAxis = new Axis("y", this.zero, -50, 50, 1, mappingType.linear);
  private zAxis = new Axis("z", this.zero, -50, 50, 1, mappingType.linear);
  private thetaAxis = new Axis(
    "t",
    this.zero,
    0,
    Math.PI * 2,
    1,
    mappingType.stack
  );
  private phiAxis = new Axis("p", this.zero, 0, Math.PI, 1, mappingType.linear);
  private rAxis = new Axis("r", this.zero, 20, 40, 1, mappingType.linear);
  public dataset: dataUnit[] = [];
  public fillType = "random";

  public axes = new Map([
    ["x", this.xAxis],
    ["y", this.yAxis],
    ["z", this.zAxis],
    ["t", this.thetaAxis],
    ["p", this.phiAxis],
    ["r", this.rAxis],
  ]);

  public useAxes: Axis[] = ["x", "y", "z"].map((e) => this.axes.get(e) as Axis);

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
}
