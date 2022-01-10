import {
  color,
  dataUnit,
  domain,
  mappingType,
  range,
  vec3,
} from "@/sketches/sanddance/SandDance";
import { Axis } from "./Axis";
import { Graph3D } from "./Graph";
import { useMapping } from "./Mapping";
import Unit from "./Unit";

class ParticleSystem {
  public Id: string = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");
  public bufferSize = 0;
  public unitArray: Unit[] = [];
  public activeGraph: Graph3D = new Graph3D();
  public dataset: dataUnit[] = [];

  public colorByKey!: vec3;

  private bindUnitsToGraph() {
    this.unitArray.forEach((e) => e.bindToGraph(this.activeGraph));
  }

  pushItem(unit: Unit) {
    this.unitArray.push(unit);
  }

  popItem() {
    return this.unitArray.pop();
  }

  clearItem() {
    this.unitArray = [];
  }

  bindDataset(dataset: dataUnit[]) {
    this.dataset = dataset;
    this.activeGraph.dataset = dataset;
    this.activeGraph.bindDataset();
    this.bufferSize = dataset.length;
    this.updateDataset();
  }

  updateDataset() {
    this.clearItem();
    this.dataset.forEach((e, i) => this.pushItem(new Unit(this.dataset, i)));
    this.bindUnitsToGraph();
  }

  mapAll() {
    this.unitArray.forEach((e) => {
      e.settPositionOnGraph();
      this.activeGraph.randomFill(e);
      e.targetPos = this.activeGraph.locateUnit(e);
      e.startMove();
    });
    // this.colorAllUnits()
  }

  setUsingAxesByString(str: string): void {
    const axes = str.split("").map((e) => this.activeGraph.axes.get(e) as Axis);
    this.activeGraph.setUsingAxes(...axes);
  }

  setAxisBindKey(axisName: string, key: keyof dataUnit): void {
    const targetAxis = this.activeGraph.axes.get(axisName);
    if (targetAxis) {
      targetAxis.setBindKey(key);
    }
  }

  setAxisMappingType(axisName: string, mapping: mappingType): void {
    const targetAxis = this.activeGraph.axes.get(axisName);
    if (targetAxis) {
      targetAxis.setMappingType(mapping);
    }
  }

  setAxesBindKeys(...keys: (string | number)[]): void {
    this.activeGraph.useAxes.forEach((e, i) => {
      e.setBindKey(keys[i]);
    });
  }

  getAvailableMappingOfAxis(axisName: string) {
    return this.activeGraph.axes.get(axisName)?.getAvailableMappingType();
  }

  async colorAllUnits() {
    const axis: Axis = this.activeGraph.useAxes.find(
      (e) => e.name === "x" || e.name === "t"
    ) as Axis;
    const colorByKey = axis.bindKey;
    const mappingType: string = axis.mappingType;
    const axisDomain = await axis.getDomain();
    const colors = this.generateColors();
    const color1 = colors[0];
    const color2 = colors[1];
    this.unitArray.forEach((unit) => {
      const rcodomain: domain = {
        range: {
          min: Math.min(color1.r, color2.r),
          max: Math.max(color1.r, color2.r),
        },
      };
      const gcodomain = {
        range: {
          min: Math.min(color1.g, color2.g),
          max: Math.max(color1.g, color2.g),
        },
      };
      const bcodomain = {
        range: {
          min: Math.min(color1.b, color2.b),
          max: Math.max(color1.b, color2.b),
        },
      };
      const preimage: string = unit.data[colorByKey].toString();

      const rimage: range = useMapping(mappingType)(axisDomain, rcodomain)(
        preimage
      );
      const gimage: range = useMapping(mappingType)(axisDomain, gcodomain)(
        preimage
      );
      const bimage: range = useMapping(mappingType)(axisDomain, bcodomain)(
        preimage
      );
      unit.setColor({ r: rimage.min, g: gimage.min, b: bimage.min });
    });
  }

  generateColors() {
    const colors: color[] = [];
    for (let j = 0; j < 2; j++) {
      const r = 100 + Math.random() * 155;
      const g = 100 + Math.random() * 155;
      const b = 100 + Math.random() * 155;
      const color = {
        r,
        g,
        b,
      };
      colors.push(color);
    }
    return colors;
  }
}
const ParticleSystemGlobal = new ParticleSystem();
export default ParticleSystemGlobal;
