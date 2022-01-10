<template>
  <div class="particle-globe">
    <ParticlesGlobe />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ParticlesGlobe from "@/sketches/particles-globe/ParticlesGlobe.vue";

export default defineComponent({
  components: {
    ParticlesGlobe,
  },
});
</script>

<style lang="less" scoped>
.particle-globe {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}
</style>
