import { domain, image, range } from "@/sketches/sanddance/SandDance";

const cache = new Map<domain, image[]>();

const Mapping = {
  linearMapping: (domain: domain, codomain: range) => {
    const image: image = {
      axisName: domain.axisName || "",
      min: 0,
      max: 0,
      length: 0,
    };
    const codomainSize = codomain.max - codomain.min;
    const domainSize = domain.range.max - domain.range.min;
    if (Number.isNaN(domainSize))
      return () => {
        const temp = { ...image, ...codomain };
        return temp;
      };
    if (codomainSize == 0 || domainSize === 0) {
      const mid = (codomain.min + codomain.max) / 2;
      image.min = mid;
      image.max = mid;
      return () => image;
    }

    const scale = codomainSize / domainSize;
    return (preImg: string) => {
      const preImgNumber = Number(preImg);
      image.min = (preImgNumber - domain.range.min) * scale + codomain.min;
      image.max = (preImgNumber - domain.range.min) * scale + codomain.min;
      return image;
    };
  },

  discreteMapping: (domain: domain, codomain: range) => {
    let images = cache.get(domain);
    const codomainSize = codomain.max - codomain.min;

    const keys = domain.groupedInfo.keys;
    const lengths = domain.groupedInfo.lengths;
    const interval = 0.08;
    const slice = codomainSize / (keys.length + interval * keys.length);
    if (interval > slice)
      console.warn("Discrete Mapping: Domain interval too large");

    if (!images) {
      images = keys.map((key, idx): image => {
        return {
          axisName: domain.axisName || "",
          min: codomain.min + idx * slice,
          max: codomain.min + (idx + 1) * slice - interval,
          length: lengths[idx],
        };
      });
      cache.set(domain, images);
    }
    return (preImg: string) => {
      const foundIndex = keys.indexOf(preImg);
      return (images || [])[foundIndex];
    };
  },

  accumulateMapping(domain: domain, codomain: range) {
    let images = cache.get(domain);
    const codomainSize = codomain.max - codomain.min;
    const keys = domain.groupedInfo.keys;
    const lengths = domain.groupedInfo.lengths;
    const max = Math.max(...lengths);
    if (!images) {
      images = keys.map((key, idx): image => {
        return {
          axisName: domain.axisName || "",
          min: codomain.min,
          max: (lengths[idx] / max) * codomainSize + codomain.min,
          length: lengths[idx],
        };
      });
      cache.set(domain, images);
    }
    return (preImg: string) => {
      const foundIndex = keys.indexOf(preImg);
      return (images || [])[foundIndex];
    };
  },
  stackMapping(domain: domain, codomain: range) {
    let images = cache.get(domain);
    const codomainSize = codomain.max - codomain.min;
    const keys = domain.groupedInfo.keys;
    const lengths = domain.groupedInfo.lengths;
    const keyNums = keys.length;
    const sum = lengths.reduce((a, c) => a + c, 0);
    const interval = 0.08;
    const expectedSum = sum * (1 + interval);
    const intervalPiece = interval / keyNums;

    if (1 - interval * length <= 0)
      console.warn("Stack Mapping: Domain interval too large");

    if (!images) {
      images = keys.map((key, idx): image => {
        const minPercent =
          lengths.slice(0, idx).reduce((a, c) => a + c, 0) / expectedSum +
          idx * intervalPiece;
        const maxPercent =
          lengths.slice(0, idx + 1).reduce((a, c) => a + c, 0) / expectedSum +
          idx * intervalPiece;
        return {
          axisName: domain.axisName || "",
          min: minPercent * codomainSize + codomain.min,
          max: maxPercent * codomainSize + codomain.min,
          length: lengths[idx],
        };
      });
      cache.set(domain, images);
    }

    return (preImg: string) => {
      const foundIndex = keys.indexOf(preImg);
      return (images || [])[foundIndex];
    };
  },
};

export function useMapping(
  type: string
): (arg0: domain, arg1: range) => (arg2: string) => image {
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

export function clearCache(): void {
  cache.clear();
}
