import { VectorN } from "@/utils/maths/vector-calculation";

declare interface Vector3 extends VectorN {
  x: number;
  y: number;
  z: number;
}

export const useBrownianMotion = () => {
  const getOffsets = (
    temp: number = 293,
    freedom: Vector3 = { x: 5, y: 5, z: 5 }
  ): Vector3 => {
    return {
      x: (Math.random() * temp * freedom.x) / 273,
      y: (Math.random() * temp * freedom.y) / 273,
      z: (Math.random() * temp * freedom.z) / 273,
    };
  };
  return { getOffsets };
};
