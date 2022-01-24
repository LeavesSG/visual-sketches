import { AlgsRunTimeInfo, emptyInfo } from "./types";
import { OperationRecorder } from "@/utils/algorithms/visualize-tools/operation-recorder";
import { sortAlgsDict } from "@/utils/algorithms/sort/sort-utils";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { OperationRecord } from "@/utils/algorithms/types";
import { Vue } from "vue-class-component";

export default defineComponent({
  setup() {
    const sourceArray = Array.from({ length: 10000 }, () => Math.random());
    const container = ref<Vue | null>(null);
    const containerWidth = computed(() => container.value?.$el.offsetWidth);

    // settings 配置项
    const useDynamicDataLength = ref(true);
    const basicLength = ref(100);
    const maxCostPerFrame = ref(5);
    const shuffleOnReset = ref(true);
    const requiredShuffle = ref(false);
    const settings = reactive({
      useDynamicDataLength,
      basicLength,
      maxCostPerFrame,
      shuffleOnReset,
    });

    // sorting stuffs 排序列表
    const unSorted = ref<number[]>([]);
    const sorting = ref<number[]>([]);
    const allSortAlgsList = ref<string[]>([]);
    const usingAlgsName = ref<string>("");

    // get all available algorithms 获取所有可用算法
    for (const [key] of sortAlgsDict) {
      allSortAlgsList.value.push(key);
    }

    // operation recorder 操作记录仪
    const operations = ref<OperationRecord[]>([]);
    const recorder = new OperationRecorder();
    const operationCount = ref(0);
    const operationCost = ref(0);
    const operationStep = ref(Infinity);
    const stepIn = () => operationStep.value++;

    // indicators 运行指标
    const runTimeInfo = reactive<AlgsRunTimeInfo>(emptyInfo);
    const comparating = ref<number[]>([]);
    const algsStartTime = ref(0);
    const animationStartTime = ref(0);

    // animation control Raf动画控制
    const frame = ref(0);
    const activeRaf = ref(0);

    const init = () => {
      // different source data length for different algorithms 动态调整数组长度
      if (
        shuffleOnReset.value ||
        sorting.value.length < 2 ||
        requiredShuffle.value
      ) {
        const algsSpeed = useDynamicDataLength.value
          ? sortAlgsDict.get(usingAlgsName.value)?.relativeVelocity || 1
          : 1;
        unSorted.value = [
          ...sourceArray.slice(0, Math.floor(basicLength.value * algsSpeed)),
        ];
        sorting.value = [...unSorted.value];
      } else {
        unSorted.value = [...sorting.value];
      }

      // reset all variables 重制所有指标
      operations.value = [];
      recorder.reset();
      comparating.value = [];
      operationCount.value = 0;
      operationCost.value = 0;
      frame.value = 0;

      // update info 更新指标信息
      runTimeInfo.algsName.value = usingAlgsName.value;
      runTimeInfo.totalUnSorted.value = sorting.value.length.toString();
    };

    const play = () => {
      if (recorder.hasNext()) {
        while (
          operationCost.value <= maxCostPerFrame.value * frame.value &&
          operationCost.value <= operationStep.value
        ) {
          // operation iteration  操作记录仪迭代
          const operation = recorder.play();
          operation?.function(sorting.value, ...operation?.args.slice(1));
          if (operation?.name === "less")
            comparating.value = [...operation?.args.slice(1)];

          // update info  更新指标信息
          runTimeInfo.operationCount.value = operationCount.value.toString();
          runTimeInfo.operationCost.value = operationCost.value.toString();
          runTimeInfo.currentOperation.value = operation?.name || "";
          if (operation?.operateTime)
            runTimeInfo.codeRunTime.value = String(
              operation?.operateTime - algsStartTime.value
            );
          runTimeInfo.animationRunTime.value = String(
            ((Date.now() - animationStartTime.value) / 1000).toFixed(2)
          );

          // operation counter increment  操作记录增量
          operationCost.value += operation?.cost || 1;
          operationCount.value++;
        }
        // update info  更新指标信息
        runTimeInfo.frameCount.value = frame.value.toString();

        // frame counter increment  帧数增量
        frame.value++;
        activeRaf.value = requestAnimationFrame(play);
      } else {
        comparating.value = [];
      }
    };

    const useSort = () => {
      cancelAnimationFrame(activeRaf.value);

      const usingAlgorithm = sortAlgsDict.get(usingAlgsName.value)?.function;
      if (!usingAlgorithm) return;
      init();
      usingAlgorithm(unSorted.value, undefined, undefined, undefined, recorder);
      // update info  更新指标信息
      algsStartTime.value = recorder.getEarliestTime() || 0;
      animationStartTime.value = Date.now();

      activeRaf.value = requestAnimationFrame(play);
    };

    watch(usingAlgsName, (_newVal, oldVal) => {
      if (sortAlgsDict.get(oldVal)?.inPlace) requiredShuffle.value = false;
      else requiredShuffle.value = true;
      useSort();
    });

    onMounted(useSort);
    return {
      container,
      containerWidth,
      sorting,
      comparating,
      usingAlgsName,
      operations,
      operationCount,
      allSortAlgsList,
      runTimeInfo,
      stepIn,
      settings,
    };
  },
});
