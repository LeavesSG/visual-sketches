export interface AlgsRunTimeInfo {
  [index: string]: {
    label: string;
    value: string;
    unit?: string;
  };
}

export const emptyInfo = {
  algsName: {
    label: "算法名称",
    value: "",
  },
  frameCount: {
    label: "运行帧数",
    value: "",
  },
  currentOperation: {
    label: "当前操作",
    value: "",
  },
  totalUnSorted: {
    label: "数据总量",
    value: "",
  },
  operationCount: {
    label: "累计操作数",
    value: "",
  },
  operationCost: {
    label: "累计算量",
    value: "",
  },
  codeRunTime: {
    label: "累计运行时间",
    value: "",
    unit: "ms",
  },
  animationRunTime: {
    label: "累计动画时间",
    value: "",
    unit: "s",
  },
};
