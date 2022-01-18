import { useBrownianMotion } from "@/composables/useBrownianMotion";
import useMotionSimulation from "@/composables/useMotionSimulation";
import { motionBlurPixelShader } from "@babylonjs/core/Shaders/motionBlur.fragment";
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
  toRefs,
} from "vue";

export default defineComponent({
  props: {
    enums: {
      type: Array as PropType<any[]>,
      required: true,
    },
  },
  setup(props) {
    // props & roots
    const { enums } = toRefs(props);
    const container = ref<HTMLElement | null>(null);
    const componentWH = computed(() => {
      if (!container.value) return { x: 0, y: 0 };
      return {
        x: container.value.offsetWidth,
        y: container.value.offsetHeight,
      };
    });

    // motion simulations
    const positions = reactive(
      Array.from({ length: enums.value.length }, () =>
        ref({ x: 0, y: 0, z: 0 })
      )
    );
    const enumsCount = computed(() => enums.value.length);
    const frame = ref(0);
    const dX = ref(0);
    const xOffset = ref(0);
    const { states, callChain, renderStart, renderPause, renderStop } =
      useMotionSimulation(enumsCount.value, 0.001);
    const { getOffsets } = useBrownianMotion();
    const getInitPos = () => {
      const y = Math.random() * componentWH.value.y + componentWH.value.y;
      return {
        x: Math.random() * componentWH.value.x * 3 - componentWH.value.x,
        y,
        z: Math.random() * 100 - 50,
      };
    };
    callChain.beforeRender = (index) => {
      states[index].position = getInitPos();
      states[index].acceleration = {
        x: Math.random() * 2 - 1,
        y: -100,
        z: Math.random() * 2 - 1,
      };
    };
    callChain.renderLoop = () => {
      for (let index = 0; index < enums.value.length; index++) {
        const initPos = getInitPos();
        if (states[index].position.y < 0) states[index].position = initPos;
        positions[index].value = states[index].position;
        states[index].velocity.x += dX.value * 8;
      }
      xOffset.value += dX.value;
      dX.value = 0;
      frame.value++;
    };

    // hooks
    onMounted(() => {
      renderStart();
    });

    //functions
    const onMouseMove = (e: MouseEvent) => {
      dX.value = e.movementX;
    };

    return { container, componentWH, positions, onMouseMove, dX, xOffset };
  },
});
