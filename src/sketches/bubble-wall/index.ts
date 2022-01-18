import { defineComponent, onMounted, ref } from "vue";
import BubbleCSS from "./BubbleCSS.vue";

export default defineComponent({
  components: {
    BubbleCSS,
  },
  setup() {
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
    const imgs = ref<HTMLImageElement[]>([]);
    const bubbles = ref<number[]>([]);
    bubbles.value = Array.from({ length: 100 }, (e, i) => i);
    onMounted(async () => {
      // imgs.value = await loadImages();
    });
    return { bubbles };
  },
});
