import {
  AxisName,
  dataUnit,
  domain,
  mappingType,
  vec3,
  range,
  groupedInfo,
} from "./../SandDance";
import _ from "lodash";

export class Axis {
  public name: AxisName = AxisName.x;
  public min = 0;
  public max = 100;
  public scale = 1;
  private zero: vec3 = { x: 0, y: 0, z: 0 };

  public bindKey: keyof dataUnit = "";
  public bindKeys: (keyof dataUnit)[] = [];
  public domain!: domain;
  public codomain!: range;

  private bindDataset: dataUnit[] = [];

  public mappingType: mappingType = mappingType.linear;

  private groupedInfo: groupedInfo | null = null;

  private domainNeedUpdate = false;

  constructor(
    name: AxisName,
    zero: vec3,
    min: number,
    max: number,
    scale: number,
    type: mappingType
  ) {
    this.name = name;
    if (zero) this.zero = zero;
    if (min) this.min = min;
    if (max) this.max = max;
    if (scale) this.scale = scale;
    if (type) this.mappingType = type;
  }

  getCodomain(): range {
    if (this.codomain) return this.codomain;
    this.updateCodomain();
    return this.codomain;
  }

  updateCodomain(): void {
    this.codomain = {
      min: this.min,
      max: this.max,
    };
  }

  setBindKey(key: keyof dataUnit): void {
    let needUpdate = true;
    if (this.bindKey === key) needUpdate = false;
    this.bindKey = key;
    this.bindKeys = [key];
    if (needUpdate) {
      this.domainNeedUpdate = true;
      this.groupDataset();
    }
  }

  setBindDataset(dataset: dataUnit[]): void {
    this.bindDataset = dataset;
    this.domainNeedUpdate = true;
  }

  getDomain(): domain {
    if (this.domain && !this.domainNeedUpdate) return this.domain;
    this.updateDomain();
    return this.domain;
  }

  groupDataset(): groupedInfo {
    const dataset = this.bindDataset;
    const bindKey: keyof dataUnit = this.bindKey;
    if (!this.bindKey || !this.bindKeys)
      return {
        keys: ["undefined"],
        lengths: [dataset.length],
        mappings: [mappingType.linear],
      };
    const grouped = _.groupBy(dataset, bindKey.toString());
    const keys = Object.keys(grouped);
    const lengths = Object.values(grouped).map((arr) => arr.length);

    const groupNum = lengths.length;
    const avgGroupSize = dataset.length / groupNum;

    let mappings: mappingType[] = [];
    if (groupNum < avgGroupSize) {
      mappings = [
        mappingType.linear,
        mappingType.discrete,
        mappingType.stack,
        mappingType.accumulate,
      ];
      this.mappingType = mappingType.linear;
    } else {
      mappings = [mappingType.linear];
      this.mappingType = mappingType.linear;
    }
    this.groupedInfo = {
      keys,
      lengths,
      mappings,
    };
    return this.groupedInfo;
  }

  getAvailableMappingType(): mappingType[] {
    return this.groupedInfo?.mappings || [];
  }

  setMappingType(mappingType: mappingType): void {
    this.mappingType = mappingType;
    this.domainNeedUpdate = true;
  }

  updateDomain(): void {
    const dataset = this.bindDataset;
    const bindKey: keyof dataUnit = this.bindKey;

    const range: range = { min: 0, max: 0 };
    if (!this.groupedInfo) {
      this.groupedInfo = this.groupDataset();
    }

    const domain: domain = {
      range,
      groupedInfo: this.groupedInfo,
      axisName: this.name,
    };
    switch (this.mappingType) {
      case "linear": {
        let [min, max] = [Infinity, -Infinity];
        dataset.forEach((row1: dataUnit) => {
          min = Math.min(min, Number(row1[bindKey]));
          max = Math.max(max, Number(row1[bindKey]));
        });
        domain.range.min = min;
        domain.range.max = max;
        break;
      }
      case "accumulate":
      case "stack":
      case "discrete":
        break;
    }
    this.domainNeedUpdate = false;
    this.domain = domain;
  }
}
