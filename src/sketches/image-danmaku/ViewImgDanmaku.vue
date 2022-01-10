<template>
  <div class="view">
    <ImgDanmaku />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ImgDanmaku from "./ImgDanmaku.vue";

export default defineComponent({
  components: {
    ImgDanmaku,
  },
});
</script>

<style lang="less" scoped src="../sketchesShared.less"></style>
