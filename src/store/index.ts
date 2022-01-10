import {
  dataUnit,
  mappingType,
  CoordSystem,
} from "@/sketches/sanddance/SandDance";
import SandDanceStore from "./modules/SandDanceStore";
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

// 为 store state 声明类型
export interface State {
  count: unknown;
  SandDanceStore: {
    activeCoordSystem: CoordSystem;
    activeDataKey: (keyof dataUnit)[];
    availabledMappingTypes: mappingType[][];
    activeMappingTypes: mappingType[];
    validateDataKeys: (keyof dataUnit)[];
    count: number;
  };
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol();

// 定义自己的 `useStore` 组合式函数
export function useStore(): Store<State> {
  return baseUseStore(key);
}

export const store = createStore<State>({
  modules: {
    SandDanceStore,
  },
  strict: true,
});
