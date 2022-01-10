import { domain, range } from "@/sketches/sanddance/SandDance";

const Mapping = {
  /** @require domain.range */
  linearMapping: (domain: domain, codomain: domain) => {
    if (!codomain.range)
      console.warn("Linear Mapping: Lack of required codomain range info!");
    const codomainRange = codomain.range || { min: 0, max: 0 };
    const size: number = codomainRange.max - codomainRange.min;
    if (!domain.range)
      console.warn("Linear Mapping: Lack of required domain range info!");
    const domainRange = domain.range;
    if (!domainRange) return () => ({ max: 0, min: 0 });
    else {
      if (size == 0) return () => codomainRange;
      if (domainRange.max - domainRange.min === 0) {
        const mid = (codomainRange.min + codomainRange.max) / 2;
        return () => ({ min: mid, max: mid });
      }

      const scale = size / (domainRange.max - domainRange.min);
      return (preImg: string) => {
        const preImgNumber = Number(preImg);
        // if (Number.isNaN(preImgNumber)) console.warn('Linear Mapping: Preimage has to be a number string!')
        const image: range = {
          min: (preImgNumber - domainRange.min) * scale + codomainRange.min,
          max: (preImgNumber - domainRange.min) * scale + codomainRange.min,
        };
        return image;
      };
    }
  },

  /** @require domain.groupMap, domain.interval */
  discreteMapping: (domain: domain, codomain: domain) => {
    if (!codomain.range)
      console.warn("Discrete Mapping: Lack of required codomain range info!");
    const codomainRange = codomain.range || { min: 0, max: 0 };
    const size: number = codomainRange.max - codomainRange.min;
    if (size == 0) {
      return () => codomainRange;
    }

    if (!domain.groupMap)
      console.warn("Discrete Mapping: Lack of required domain groupMap info!");
    if (!domain.interval)
      console.warn("Discrete Mapping: Lack of required domain interval info!");
    const enums = domain.groupKeys || [];

    const interval = domain.interval || 0;
    const slice = size / (enums.length + interval * enums.length);

    return (preImg: string) => {
      const foundIndex = enums.indexOf(preImg);
      if (interval > slice)
        console.warn("Discrete Mapping: Domain interval too large");
      const min = codomainRange.min + foundIndex * slice;
      const max = codomainRange.min + (foundIndex + 1) * slice - interval;
      const image = {
        min: min,
        max: max,
      };
      if (max - min < 0.5) {
        console.log(min, max, foundIndex);
      }
      return image;
    };
  },

  /** @require domain.groupMap, domain.groupLengths */
  accumulateMapping(domain: domain, codomain: domain) {
    if (!codomain.range)
      console.warn("Accumulate Mapping: Lack of required codomain range info!");
    const codomainRange = codomain.range || { min: 0, max: 0 };
    const size: number = codomainRange.max - codomainRange.min;
    if (size == 0) return () => codomainRange;
    const groupMap = domain.groupMap || new Map();
    if (groupMap.size <= 0)
      console.warn(
        "Accumulate Mapping: Lack of required domain groupMap info!"
      );
    const values = domain.groupLengths || [];
    const max = Math.max(...values);
    return (preImg: string) => {
      if ((groupMap.get(preImg) / max) * size + codomainRange.min < 1)
        console.log(groupMap.get(preImg), size);
      const image: range = {
        min: codomainRange.min,
        max: (groupMap.get(preImg) / max) * size + codomainRange.min,
      };
      return image;
    };
  },

  /** @require domain.groupMap, domain.interval */
  stackMapping(domain: domain, codomain: domain) {
    if (!codomain.range)
      console.warn("Stack Mapping: Lack of required codomain range info!");
    const codomainRange = codomain.range || { min: 0, max: 0 };
    const size: number = codomainRange.max - codomainRange.min;
    if (size == 0) return () => codomainRange;

    if (!domain.groupMap)
      console.warn("Stack Mapping: Lack of required domain groupMap info!");
    if (!domain.interval)
      console.warn("Stack Mapping: Lack of required domain interval info!");
    const groupMap = domain.groupMap || new Map();
    const groupKeys: string[] = [];
    const groupValues: number[] = [];
    const length = groupKeys.length;
    groupMap.forEach((v, k) => {
      groupKeys.push(k);
      groupValues.push(v);
    });
    const sum = groupValues.reduce((a, c) => a + c, 0);
    const interval = domain.interval || 0;
    if (1 - interval * length <= 0)
      console.warn("Stack Mapping: Domain interval too large");
    return (preImg: string) => {
      const foundIndex = groupKeys.indexOf(preImg);
      const minPercent =
        groupValues.slice(0, foundIndex).reduce((a, c) => a + c, 0) / sum +
        foundIndex * interval;
      const maxPercent =
        groupValues.slice(0, foundIndex + 1).reduce((a, c) => a + c, 0) / sum +
        foundIndex * interval;
      const image = {
        min: minPercent * size + codomainRange.min,
        max: maxPercent * size + codomainRange.min,
      };
      return image;
    };
  },
};

export function useMapping(
  type: string
): (arg0: domain, arg1: domain) => (arg2: string) => range {
  switch (type) {
    case "linear":
      return Mapping.linearMapping;
    case "discrete":
      return Mapping.discreteMapping;
    case "accumulate":
      return Mapping.accumulateMapping;
    case "stack":
      return Mapping.stackMapping;
    default:
      return Mapping.linearMapping;
  }
}
