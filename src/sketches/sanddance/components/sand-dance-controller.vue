<template>
  <div class="sd-controller">
    <!-- 设置坐标系 -->
    <div class="controller-group">
      <span class="coords-label">请选择要使用的坐标系:</span>
      <el-select
        class="coord-selector"
        v-model="activeCoord"
        placeholder="Select using coordinate system."
      >
        <el-option
          v-for="item in validateCoords"
          :key="item.key"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <!-- 设置坐标轴 -->
    <div class="controller-group" v-for="(item, idx) in activeAxes" :key="idx">
      <span class="coords-label">{{
        `设置坐标轴${item}绑定的字段/映射类型`
      }}</span>
      <el-select
        class="coord-selector"
        v-model="activeDataKeys[idx].value"
        placeholder="Select using coordinate system."
      >
        <el-option
          v-for="item in validateDataKeys"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-select
        class="coord-selector"
        v-model="activeMappingTypes[idx].value"
        placeholder="Select using coordinate system."
      >
        <el-option
          v-for="item in availableMappings[idx]"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>
    <el-button type="primary" @click="$emit('update', true)">update</el-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, PropType, watch } from "vue";
import { CoordSystem, mappingType } from "@/sketches/sanddance/SandDance";
import { useStore } from "@/store";

const validateCoords = [
  {
    label: "笛卡尔坐标系(xyz)",
    key: "xyz",
    value: "xyz" as CoordSystem,
  },
  {
    label: "球坐标系(θφr)",
    key: "tpr",
    value: "tpr" as CoordSystem,
  },
  {
    label: "柱坐标系(θrz)",
    key: "trz",
    value: "trz" as CoordSystem,
  },
];

export default defineComponent({
  props: {
    methods: Object as PropType<{
      [index: string]: (...params: any) => void | mappingType[];
    }>,
  },
  setup(props) {
    const store = useStore();
    const { methods } = toRefs(props);

    const activeCoord = computed({
      get: () => store.state.SandDanceStore.activeCoordSystem,
      set: (coord) => {
        store.commit("setCoordSystem", { CoordSystem: coord });
      },
    });
    watch(activeCoord, (newValue) => {
      methods.value?.setUsingAxes(newValue);
      for (let idx = 0; idx < 3; idx++) {
        const axisName = newValue[idx];
        methods.value?.setAxisBindKey(
          axisName,
          activeDataKeys.value[idx].value
        );
        methods.value?.setMappingType(
          axisName,
          activeMappingTypes.value[idx].value
        );
      }
    });

    const activeDataKeys = computed(() =>
      Array.from({ length: 3 }, (e, i) => {
        return computed({
          get: () => store.state.SandDanceStore.activeDataKey[i],
          set: (key) => {
            store.commit("setDataKey", {
              axisIndex: i,
              dataKey: key,
            });
          },
        });
      })
    );
    watch(activeDataKeys.value, (newValue, oldValue) => {
      if (!activeCoord.value) return;
      let idx = 0;
      for (let i = 0; i < 3; i++) {
        if (newValue[i] !== oldValue[i]) idx = i;
      }
      const axisName = activeCoord.value[idx];
      methods.value?.setAxisBindKey(axisName, newValue[idx]);
      const mappings = methods.value?.getAvailableMapping(axisName);
      store.commit("setAvailableMapping", { axisIndex: idx, mappings });
      mappings &&
        store.commit("setMappingType", {
          axisIndex: idx,
          mapping: mappings[0],
        });
    });

    const activeMappingTypes = computed(() =>
      Array.from({ length: 3 }, (e, i) => {
        return computed({
          get: () => store.state.SandDanceStore.activeMappingTypes[i],
          set: (mapping) => {
            store.commit("setMappingType", {
              axisIndex: i,
              mapping: mapping,
            });
          },
        });
      })
    );

    watch(activeMappingTypes.value, (newValue, oldValue) => {
      if (!activeCoord.value) return;
      let idx = 0;
      for (let i = 0; i < 3; i++) {
        if (newValue[i] !== oldValue[i]) idx = i;
      }
      const axisName = activeCoord.value[idx];
      methods.value?.setMappingType(axisName, newValue[idx]);
    });

    const validateDataKeys = computed(
      () => store.state.SandDanceStore.validateDataKeys
    );
    const availableMappings = computed(
      () => store.state.SandDanceStore.availabledMappingTypes
    );

    const activeAxes = computed(() => activeCoord.value.split(""));

    return {
      activeCoord,
      activeAxes,
      activeDataKeys,
      validateCoords,
      activeMappingTypes,
      availableMappings,
      validateDataKeys,
    };
  },
});
</script>
<style lang="less" scoped src="./sand-dance-style.less"></style>
