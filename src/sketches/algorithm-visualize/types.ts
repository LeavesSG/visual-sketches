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
  arrayEntries: {
    label: "累计数组访问",
    value: "",
  },
  comparisons: {
    label: "累计比较数",
    value: "",
  },
};
