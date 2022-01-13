<template>
  <div class="app-container">
    <el-tabs v-model="path" @tab-click="handleClick" class="nav">
      <el-tab-pane label="Home" name=""></el-tab-pane>
      <el-tab-pane label="SandDance" name="sanddance"></el-tab-pane>
      <el-tab-pane label="ParticlesGlobe" name="particlesglobe"></el-tab-pane>
      <el-tab-pane label="ImageDanmaku" name="imageDanmaku"></el-tab-pane>
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
  background: linear-gradient(90deg, #90f6d8, #90d8f9);
  color: #fff;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
}
.nav {
  display: flex;
  justify-content: center;
}
</style>
