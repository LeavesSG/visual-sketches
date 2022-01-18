<template>
  <div class="view">
    <BubbleCSS :enums="bubbles">
      <template #="props">
        <!-- <img class="blend-image" :src="props.item.src || ''" alt="img" /> -->
        <div class="bubble"></div>
      </template>
    </BubbleCSS>
  </div>
</template>

<script lang="ts" src="./index">
import BubbleCSS from './BubbleCSS.vue';
</script>

<style lang="less" scoped src="./bubble-wall.less"></style>
<style lang="less" scoped src="../sketchesShared.less"></style>
