import { range, vec3 } from "@/sketches/sanddance/SandDance";

export const GLOBAL_SETTING = new Map()
  .set("UNIT_SIZE", 10) // 默认unit大小
  .set("UNIT_POS", { x: 0, y: 0, z: 0 }) // 默认unit位置
  .set("UNIT_COLOR", { r: 1, g: 1, b: 1 }) // 默认 unit颜色
  .set("POSITION_PROXIMITY", 0) // 位置近似
  .set("TRANSITION_TIME", 3000) // 变换间隔
  .set("VALID_AXES", ["xyz", "tpr", "trz"]) //合理坐标
  .set("SPREAD_MODE", "random") // 扩散模式
  .set("GRAPH_TYPE", "2d") //  图像形式
  .set("STACK_SIZE", 0.1); // 堆栈高度

export function _get(key: unknown): number | range | vec3 | string | string[] {
  return GLOBAL_SETTING.get(key);
}

export function _proximate(num: number): number {
  const p = _get("POSITION_PROXIMITY");
  if (typeof p !== "number" || p === 0) return num;
  else return Math.round(num * p) / p;
}
