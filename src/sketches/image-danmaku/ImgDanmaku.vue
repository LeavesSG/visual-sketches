<template>
  <div class="img-danmaku">
    <div class="img-containers" ref="container">
      <img
        class="formula"
        v-for="(img, idx) in imgs"
        :key="idx"
        :src="img.src || ''"
        alt="img"
        :style="{
          transform: `translate(${positions[idx]?.value?.x}px, ${positions[idx]?.value?.y}px)`,
        }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, Ref } from "vue";

export default defineComponent({
  setup() {
    const container = ref<HTMLElement | null>(null);
    const loadCounter = ref(0);
    const loadImages = async () => {
      const loader = require.context(
        "@/assets/img-danmaku",
        false,
        /.(png|jpeg|jpg)$/
      );
      const imgKeys = loader.keys();

      return Promise.all(
        imgKeys.map((src) => {
          return new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.src = loader(src);
            img.onload = () => {
              loadCounter.value++;
              resolve(img);
            };
            img.onerror = () => {
              loadCounter.value++;
              resolve(img);
            };
          });
        })
      );
    };

    let positions = ref<Ref<{ x: number; y: number; s: number }>[]>([]);
    const componentWH = computed(() => {
      if (!container.value) return { x: 0, y: 0 };
      return {
        x: container.value.offsetWidth,
        y: container.value.offsetHeight,
      };
    });
    const animate = () => {
      const initPos = () =>
        ref({
          x: componentWH.value.x + 100,
          y: Math.round(Math.random() * componentWH.value.y * 0.8),
          s: Math.round(1 + Math.random() * 2),
        });
      if (positions.value.length < imgs.value.length) {
        positions.value = reactive(imgs.value.map(() => initPos()));
      }
      imgs.value.forEach((e, i) => {
        // // eslint-disable-next-line no-debugger
        // debugger;
        let pos = positions.value[i];
        pos.value.x -= pos.value.s;
        if (pos.value.x <= -150) {
          pos.value = initPos().value;
        }
      });
      requestAnimationFrame(animate);
    };
    const imgs = ref<HTMLImageElement[]>([]);
    onMounted(async () => {
      imgs.value = await loadImages();
      requestAnimationFrame(animate);
    });
    return { container, imgs, positions };
  },
});
</script>

<style lang="less" scoped>
.img-danmaku {
  width: 600px;
  height: 400px;
  overflow: hidden;
  background-color: steelblue;
}
.img-containers {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.formula {
  width: 150px;
  background-color: #000;
  mix-blend-mode: color-burn;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
