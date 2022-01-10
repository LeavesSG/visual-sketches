import { Axis } from "./Axis";
import { Graph3D } from "./Graph";
import { useMapping } from "./Mapping";
import { _get, _proximate } from "./SETTING";
import { color, dataUnit, range, vec3 } from "../SandDance";

export default class Unit {
  public data: dataUnit;
  public pos: vec3;
  private color: color;
  private size: number;
  public bindGraph!: Graph3D;

  private moveSpeed: vec3 = { x: 0, y: 0, z: 0 };
  public framesTake = 0;

  public OnAxisRange = new Map([
    ["x", { min: 0, max: 0 }],
    ["y", { min: 0, max: 0 }],
    ["z", { min: 0, max: 0 }],
    ["t", { min: 0, max: 0 }],
    ["p", { min: 0, max: 0 }],
    ["r", { min: 0, max: 0 }],
  ]);

  public onAxisValue: Map<string, number> = new Map();

  public targetRange!: {
    x: range;
    y: range;
    z: range;
  };

  public targetPos!: vec3;

  constructor(
    dataset: dataUnit[],
    index: number,
    pos: vec3 = _get("UNIT_POS") as vec3,
    color: color = _get("UNIT_COLOR") as unknown as color,
    size: number = _get("UNIT_SIZE") as number
  ) {
    this.data = dataset[index];
    this.pos = pos;
    this.color = color;
    this.size = size;
  }

  moveTowards(): void {
    if (this.framesTake-- > 1) {
      this.pos.x += this.moveSpeed.x;
      this.pos.y += this.moveSpeed.y;
      this.pos.z += this.moveSpeed.z;
    } else {
      this.pos = this.targetPos;
      this.framesTake = 0;
    }
  }

  getColor(): number[] {
    return [this.color.r, this.color.g, this.color.b];
  }

  setPosition(newPos: vec3): void {
    this.pos = newPos;
  }

  setColor(color: color): void {
    this.color = color;
  }

  bindToGraph(graph: Graph3D): void {
    this.bindGraph = graph;
  }

  getRangeOnAxis(axis: Axis): range {
    if (!this.data[axis.bindKey]) return { min: 0, max: 0 };

    const domain = axis.getDomain();
    const codomain = axis.getCodomain();
    let preimage = "";
    switch (axis.mappingType) {
      case "linear": {
        preimage = this.data[axis.bindKey].toString();
        break;
      }
      case "accumulate":
      case "discrete":
      case "stack": {
        preimage = this.data[axis.bindKey].toString();
        break;
      }
    }

    const value = useMapping(axis.mappingType)(domain, codomain)(preimage);
    return value;
  }

  settPositionOnGraph(): void {
    this.bindGraph.useAxes.forEach((axis) => {
      const range: range = this.getRangeOnAxis(axis);
      this.OnAxisRange.set(axis.name, range);
    });
  }

  startMove(): void {
    this.targetPos = {
      x: _proximate(this.targetPos.x),
      y: _proximate(this.targetPos.y),
      z: _proximate(this.targetPos.z),
    };
    const time = ((_get("TRANSITION_TIME") as number) / 1000) * 60;
    this.moveSpeed = {
      x: (this.targetPos.x - this.pos.x) / time,
      y: (this.targetPos.y - this.pos.y) / time,
      z: (this.targetPos.z - this.pos.z) / time,
    };
    this.framesTake = time;
  }
}
