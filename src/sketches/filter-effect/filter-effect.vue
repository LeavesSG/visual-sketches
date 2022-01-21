<template>
  <div class="view">
    <div class="gradient"></div>
    <div class="inner-container">
      <div class="screen">
        <img
          src="@/assets/nsoc-logo/nsoc-logo-hue-rotated.png"
          class="logo logo2"
        />
        <img src="@/assets/nsoc-logo/nsoc-logo.png" class="logo logo1" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style lang="less" scoped src="../sketchesShared.less"></style>
<style lang="less" scoped>
.view {
  // width: 900px;
  // height: 600px;
  overflow: hidden;
}
.inner-container {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  overflow: hidden;
  filter: blur(130px);
}
.screen {
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  grid: 1fr/ 1fr;
  place-items: center;
  transform: scale(5);
}

.logo {
  width: 40%;
  position: absolute;
  transform-origin: center;
  opacity: 0.8;
  pointer-events: none;
}
.logo1 {
  animation: infinite rotateZ1 23s linear;
}
.logo2 {
  animation: infinite rotateZ2 29s linear;
}

.gradient {
  width: 100%;
  height: 100%;
  position: absolute;
  border: 1px solid white;
  --top-left-color: rgba(0, 255, 234, 0.8);
  --top-right-color: rgba(85, 231, 85, 0.8);
  --bottom-left-color: rgba(122, 45, 188, 0.7);
  --bottom-right-color: rgba(18, 214, 165, 0.9);
  background-image: radial-gradient(
      farthest-side at 0% 0%,
      var(--top-left-color),
      transparent
    ),
    radial-gradient(
      farthest-side at 100% 0%,
      var(--top-right-color),
      transparent
    ),
    radial-gradient(
      farthest-corner at 100% 100%,
      var(--bottom-right-color),
      transparent
    ),
    radial-gradient(
      farthest-corner at 0% 100%,
      var(--bottom-left-color),
      transparent
    );
}

@keyframes rotateZ1 {
  0% {
    transform: translateX(-10%) rotateZ(0deg);
  }
  100% {
    transform: translateX(-10%) rotateZ(360deg);
  }
}
@keyframes rotateZ2 {
  0% {
    transform: translateX(10%) rotateZ(180deg);
  }
  100% {
    transform: translateX(10%) rotateZ(540deg);
  }
}
</style>
