import {
  dataUnit,
  domain,
  mappingType,
  vec3,
  range,
} from "@/sketches/sanddance/SandDance";
import _ from "lodash";

interface groupedInfo {
  grouped:
    | _.Dictionary<[dataUnit, ...dataUnit[]]>
    | { undefined: dataUnit[][] };
  groupedKeys: string[];
  groupedValues: dataUnit[][];
  lengths: number[];
  availableMappings: mappingType[];
}

export class Axis {
  public name: string;
  private min = 0;
  private max = 100;
  public scale = 1;
  private zero: vec3 = { x: 0, y: 0, z: 0 };

  public bindKey: keyof dataUnit = "";
  public bindKeys: (keyof dataUnit)[] = [];
  public domain!: domain;
  public codomain!: domain;

  private bindDataset: dataUnit[] = [];

  public mappingType: mappingType = mappingType.linear;

  private groupedInfo: groupedInfo | null = null;

  private domainNeedUpdate = false;

  constructor(
    name: string,
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

  getCodomain(): domain {
    if (this.codomain) return this.codomain;
    this.updateCodomain();
    return this.codomain;
  }

  updateCodomain(): void {
    this.codomain = {
      range: {
        min: this.min,
        max: this.max,
      },
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
        grouped: { undefined: [dataset] },
        groupedKeys: ["undefined"],
        groupedValues: [dataset],
        lengths: [dataset.length],
        availableMappings: [mappingType.linear],
      };
    const grouped = _.groupBy(dataset, bindKey.toString());
    const groupedKeys = Object.keys(grouped);
    const groupedValues = Object.values(grouped);

    const lengths = Object.values(grouped).map((arr) => arr.length);
    const groupNum = lengths.length;
    const avgGroupSize = dataset.length / groupNum;

    let availableMappings: mappingType[] = [];
    if (groupNum < avgGroupSize) {
      availableMappings = [
        mappingType.linear,
        mappingType.discrete,
        mappingType.stack,
        mappingType.accumulate,
      ];
      this.mappingType = mappingType.linear;
    } else {
      availableMappings = [mappingType.linear];
      this.mappingType = mappingType.linear;
    }
    this.groupedInfo = {
      grouped,
      groupedKeys,
      groupedValues,
      lengths,
      availableMappings,
    };
    return this.groupedInfo;
  }

  getAvailableMappingType(): mappingType[] {
    return this.groupedInfo?.availableMappings || [];
  }

  setMappingType(mappingType: mappingType): void {
    this.mappingType = mappingType;
    this.domainNeedUpdate = true;
  }

  async updateDomain(): Promise<void> {
    const dataset = this.bindDataset;
    const bindKey: keyof dataUnit = this.bindKey;
    const interval = 0.05;
    const range: range = { min: 0, max: 0 };
    const groupMap = new Map();

    if (!this.groupedInfo) {
      this.groupedInfo = this.groupDataset();
    }
    const { groupedKeys, groupedValues, lengths } = this.groupedInfo;

    const domain: domain = {
      range,
      interval,
      groupMap,
      groupKeys: groupedKeys,
      groupValues: groupedValues,
      groupLengths: lengths,
    };
    switch (this.mappingType) {
      case "linear": {
        let [min, max] = [Infinity, -Infinity];
        dataset.forEach((row1: dataUnit) => {
          min = Math.min(min, Number(row1[bindKey]));
          max = Math.max(max, Number(row1[bindKey]));
        });
        if (domain.range) {
          domain.range.min = min;
          domain.range.max = max;
        }
        break;
      }
      case "accumulate":
      case "stack":
      case "discrete":
        groupedKeys.forEach((key, index) => {
          (domain.groupMap as Map<string, number>).set(key, lengths[index]);
        });
        break;
    }
    this.domainNeedUpdate = false;
    this.domain = domain;
  }
}
