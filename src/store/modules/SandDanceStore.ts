import {
  dataUnit,
  mappingType,
  CoordSystem,
} from "@/sketches/sanddance/SandDance";

export default {
  state: {
    activeCoordSystem: "xyz" as CoordSystem,
    activeDataKey: ["", "", ""] as (keyof dataUnit)[],
    availabledMappingTypes: [[], [], []] as mappingType[][],
    activeMappingTypes: [
      mappingType.linear,
      mappingType.linear,
      mappingType.linear,
    ] as mappingType[],
    validateDataKeys: [] as (keyof dataUnit)[],
    count: 0,
  },
  mutations: {
    setCoordSystem(
      state: { activeCoordSystem: CoordSystem },
      payload: { CoordSystem: CoordSystem }
    ): void {
      state.activeCoordSystem = payload.CoordSystem;
    },
    setDataKeys(
      state: {
        activeCoordSystem: string | string[];
        activeDataKey: (keyof dataUnit)[];
      },
      payload: { dataKeys: (keyof dataUnit)[] }
    ): void {
      state.activeDataKey = payload.dataKeys;
    },
    setMappingTypes(
      state: {
        activeCoordSystem: string | string[];
        activeMappingTypes: mappingType[];
      },
      payload: { mappings: mappingType[] }
    ): void {
      state.activeMappingTypes = payload.mappings;
    },
    setValidateDataKey(
      state: { validateDataKeys: (string | number)[] },
      payload: { keys: (keyof dataUnit)[] }
    ): void {
      state.validateDataKeys = payload.keys;
    },

    setDataKey(
      state: {
        activeDataKey: (keyof dataUnit)[];
      },
      payload: { axisIndex: number; dataKey: keyof dataUnit }
    ): void {
      state.activeDataKey[payload.axisIndex] = payload.dataKey;
    },

    setMappingType(
      state: {
        activeMappingTypes: mappingType[];
      },
      payload: { axisIndex: number; mapping: mappingType }
    ): void {
      state.activeMappingTypes[payload.axisIndex] = payload.mapping;
    },
    setAvailableMapping(
      state: {
        availabledMappingTypes: mappingType[][];
      },
      payload: { axisIndex: number; mappings: mappingType[] }
    ): void {
      state.availabledMappingTypes[payload.axisIndex] = payload.mappings;
    },
  },
  getters: {
    getActiveKey:
      (state: {
        activeCoordSystem: string | string[];
        activeDataKey: (keyof dataUnit)[];
      }) =>
      (axisName: string): keyof dataUnit => {
        const idx = state.activeCoordSystem.indexOf(axisName);
        if (idx > -1) return state.activeDataKey[idx];
        return "";
      },
    getAvailableMapping:
      (state: {
        activeCoordSystem: string | string[];
        availabledMappingType: { [x: string]: mappingType[] };
      }) =>
      (axisName: string): mappingType[] => {
        const idx = state.activeCoordSystem.indexOf(axisName);
        if (idx > -1) return state.availabledMappingType[idx];
        return [];
      },
    getActiveMapping:
      (state: {
        activeCoordSystem: string | string[];
        activeMappingType: { [x: string]: mappingType };
      }) =>
      (axisName: string): mappingType => {
        const idx = state.activeCoordSystem.indexOf(axisName);
        if (idx > -1) return state.activeMappingType[idx];
        return mappingType.linear;
      },
  },
};
