<template>
  <div class="sand-dance">
    <SandDance />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SandDance from "@/sketches/sanddance/components/SandDance.vue";

export default defineComponent({
  components: {
    SandDance,
  },
});
</script>

<style lang="less" scoped>
.sand-dance {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}
</style>
