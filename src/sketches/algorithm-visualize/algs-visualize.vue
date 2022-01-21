<template>
  <div class="view">
    <!-- soring-items -->
    <transition-group name="sorting-items" tag="div" class="container">
      <div
        class="bar"
        v-for="(item, index) in sorting"
        :class="{ comparating: comparating.includes(index) }"
        :key="item"
        :style="{
          height: item * 100 + '%',
          width: 1280 / sorting.length + 'px',
        }"
      ></div>
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
    <el-card class="info-card">
      <div
        v-for="item in Object.values(runTimeInfo)"
        :key="item.label"
        class="text item"
      >
        {{ item.label + ":  " + item.value + " " + (item.unit || "") }}
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style lang="less" scoped src="../sketchesShared.less"></style>
<style lang="less" scoped src="./algs-visualize.less"></style>
