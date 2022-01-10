export const randomizer = {
  linear: (): number => Math.random(),
  square: (): number => {
    return Math.pow(Math.random(), 2);
  },
  max: (): number => {
    return Math.max(Math.random(), Math.random());
  },
  min: (): number => {
    return Math.min(Math.random(), Math.random());
  },
};

const mockData = Array.from({ length: 40000 }, (e, i) => {
  return {
    name: "数据项-" + i,
    id: i,
    emptyDim: "",
    discrete: (i % 10).toString(),
    linear: randomizer.linear(),
    linear2: randomizer.linear(),
    linear3: randomizer.linear(),
    discreate2: (Math.pow(Math.round(randomizer.linear() * 10), 2) % 10) + 1,
    min: randomizer.min(),
    max: randomizer.max(),
    constant: 1,
  };
});

export default mockData;
