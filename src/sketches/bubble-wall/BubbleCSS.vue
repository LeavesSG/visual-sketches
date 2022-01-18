<template>
  <div class="img-danmaku">
    <div class="inner-containers" ref="container" @mousemove="onMouseMove">
      <div
        class="bubble-container"
        v-for="(item, index) in enums"
        :key="index"
        :style="{
          transform: `translate3D(${positions[
            index
          ]?.value.x.toFixed()}px, ${positions[
            index
          ]?.value.y.toFixed()}px, ${positions[index]?.value.z.toFixed()}px)`,
        }"
      >
        <slot :item="item" :index="index" :position="positions[index]"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./bubble-render.ts"></script>

<style lang="less" scoped>
.img-danmaku {
  width: 12800px;
  height: 800px;
  overflow: hidden;
  background-image: linear-gradient(180deg, #00d6f9, #60aef9);
}
.inner-containers {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  perspective: 600px;
}
.bubble-container {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
