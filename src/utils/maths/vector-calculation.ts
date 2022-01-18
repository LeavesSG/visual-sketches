export interface VectorN {
  [index: string]: number;
}

/**
 * Normalize a vector
 * @constructor
 * @param {T extends VectorN} vecn - The target vector
 */
export const vectorNormalization = <T extends VectorN>(vecn: T) => {
  const l = getVectorLength(vecn);
  return scalarMultiplication(vecn, 1 / l);
};

/**@描述 返回向量的模 */
export const getVectorLength = <T extends VectorN>(vecn: T) => {
  return Math.sqrt(
    Object.keys(vecn).reduce((a, c) => a + Math.pow(vecn[c], 2), 0)
  );
};

/**@描述 返回向量与有理数相乘的结果 */
export const scalarMultiplication = <T extends VectorN>(vecn: T, k: number) => {
  const result: T = { ...vecn };
  Object.keys(result).forEach(
    (e: keyof T) => ((result[e] as number) = result[e] * k)
  );
  return result;
};

/**@描述 将两个向量的值相加 */
export const vectorAddition = <T extends VectorN>(vecn1: T, vecn2: T) => {
  const result: T = { ...vecn1 };
  Object.keys(result).forEach(
    (e: keyof T) => ((result[e] as number) += vecn2[e])
  );
  return result;
};

/**@描述 将两个向量的值相减 */
export const vectorDeduction = <T extends VectorN>(vecn1: T, vecn2: T) => {
  const result: T = { ...vecn1 };
  Object.keys(result).forEach(
    (e: keyof T) => ((result[e] as number) -= vecn2[e])
  );
  return result;
};
