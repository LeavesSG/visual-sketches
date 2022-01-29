<template>
  <div class="view">
    <!-- soring-items -->
    <transition-group
      name="sorting-items"
      tag="div"
      class="container"
      ref="container"
    >
      <div
        class="bar"
        v-for="(item, index) in sorting"
        :class="{ comparating: arrayEntring.includes(index) }"
        :key="item"
        :style="{
          height: item * 100 + '%',
          width: containerWidth / sorting.length + 'px',
          left: (containerWidth / sorting.length) * index + 'px',
        }"
      >
        <div class="bar-inner" :key="'child' + index"></div>
      </div>
    </transition-group>
    <!-- algs switcher -->
    <el-tabs
      class="algorithms-switcher"
      tab-position="left"
      v-model="usingAlgsName"
    >
      <el-tab-pane
        v-for="item in allSortAlgsList"
        :key="item"
        :label="item"
        :name="item"
      ></el-tab-pane>
    </el-tabs>
    <!-- info-card -->
    <el-card class="info-card" @click="stepIn">
      <div
        v-for="item in Object.values(runTimeInfo)"
        :key="item.label"
        class="text item"
        @click="stepIn"
      >
        {{ item.label + ":  " + item.value + " " + (item.unit || "") }}
      </div>
    </el-card>
    <!-- algs controller -->
    <div class="controller">
      <div class="controller-item">
        <span class="label">基础长度</span
        ><el-slider
          v-model="settings.basicLength"
          :min="1"
          :max="200"
        ></el-slider>
      </div>
      <div class="controller-item">
        <span class="label">动画速率</span
        ><el-slider
          v-model="settings.maxCostPerFrame"
          :min="0.5"
          :max="10"
        ></el-slider>
      </div>
      <div class="controller-item">
        <span class="label">动态长度</span
        ><el-switch v-model="settings.useDynamicDataLength" />
      </div>
      <div class="controller-item">
        <span class="label">自动洗牌</span
        ><el-switch v-model="settings.shuffleOnReset" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style lang="less" scoped src="../sketchesShared.less"></style>
<style lang="less" scoped src="./algs-visualize.less"></style>
