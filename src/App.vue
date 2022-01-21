<template>
  <div class="app-container">
    <el-tabs v-model="path" @tab-click="handleClick" class="nav">
      <el-tab-pane label="Home" name=" "></el-tab-pane>
      <el-tab-pane label="SandDance" name="sand-dance"></el-tab-pane>
      <el-tab-pane label="ParticlesGlobe" name="particles-globe"></el-tab-pane>
      <el-tab-pane label="BubbleWall" name="bubble-wall"></el-tab-pane>
      <el-tab-pane label="FilterEffect" name="filter-effect"></el-tab-pane>
      <el-tab-pane
        label="Algorithm Visualization"
        name="algs-visualize"
      ></el-tab-pane>
    </el-tabs>
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const path = ref("");
    const router = useRouter();
    const handleClick = () => {
      router.push(`/${path.value}`);
    };

    return { path, handleClick };
  },
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #111;
  color: #fff;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
}
.nav {
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 1;
  width: 100vw;

  .el-tabs__item {
    color: #fefefe;
  }
}
</style>
