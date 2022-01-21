<template>
  <div class="screen">
    <canvas ref="canvas" class="canvas full" />
    <sand-dance-controller-vue
      class="sd-controller"
      :methods="controllMethods"
      @update="update"
    ></sand-dance-controller-vue>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "@vue/runtime-core";
import useParticleSystem from "@/composables/useParticleSystem";
import useBabylonScene from "@/composables/useBabylonPCS";
import mockData from "@/utils/mockData";
import { CloudPoint, Color4 } from "@babylonjs/core";
import {
  SceneInfo,
  dataUnit,
  mappingType,
} from "@/sketches/sanddance/SandDance";

import { useStore } from "@/store";
import sandDanceControllerVue from "./sand-dance-controller.vue";

export default defineComponent({
  name: "SandDance",
  components: { sandDanceControllerVue },
  setup() {
    const store = useStore();

    let sceneInfo: SceneInfo = {
      scene: null,
      engine: null,
      ps: null,
    };

    const canvas = ref<HTMLCanvasElement | null>(null);

    const { PSG } = useParticleSystem(mockData);
    store.commit({
      type: "setValidateDataKey",
      keys: Object.keys(mockData[0]).slice(1),
    });

    const setUsingAxes = (useAxes: string): void => {
      PSG.setUsingAxesByString(useAxes);
    };

    const setAxisBindKey = (axisName: string, key: keyof dataUnit): void => {
      PSG.setAxisBindKey(axisName, key);
    };

    const getAvailableMapping = (axisName: string) => {
      return PSG.getAvailableMappingOfAxis(axisName);
    };

    const setMappingType = (axisName: string, mapping: mappingType): void => {
      PSG.setAxisMappingType(axisName, mapping);
    };

    const changeGraph = (): void => {
      PSG.mapAll();
    };

    const controllMethods = {
      setUsingAxes,
      setAxisBindKey,
      changeGraph,
      getAvailableMapping,
      setMappingType,
    };

    const update = (): void => {
      changeGraph();
      const SPS = sceneInfo.ps;
      if (SPS) {
        SPS.particles.forEach((p) => {
          const color = PSG.unitArray[p.idx].getColor();
          p.color = new Color4(
            color[0] / 255,
            color[1] / 255,
            color[2] / 255,
            1
          );
        });
      }

      console.log(PSG);
    };
    const initAnimation = () => {
      if (!sceneInfo.ps) return;
      let idx;
      const updateParticle = (particle: CloudPoint) => {
        idx = particle.idx;
        if (PSG.unitArray[idx].framesTake > 0) {
          PSG.unitArray[idx].moveTowards();
          const pos = PSG.unitArray[idx].pos;
          particle.position.x = pos.x;
          particle.position.y = pos.y;
          particle.position.z = pos.z;
        }
        return particle;
      };
      sceneInfo.ps.updateParticle = updateParticle;
    };

    onMounted(() => {
      Object.assign(window, { PSG });

      if (canvas.value)
        sceneInfo = useBabylonScene(canvas.value, mockData.length);
      if (sceneInfo.ps) {
        const positions = sceneInfo.ps.particles.map((e: CloudPoint) => ({
          x: e.position.x,
          y: e.position.y,
          z: e.position.z,
        }));
        PSG.unitArray.forEach((e, i) => e.setPosition(positions[i]));
        console.log(PSG);
        setTimeout(() => {
          initAnimation();
        }, 1000);
      }
    });

    return {
      canvas,
      update,
      controllMethods,
    };
  },
});
</script>

<style lang="less" scoped src="./sand-dance-style.less"></style>
