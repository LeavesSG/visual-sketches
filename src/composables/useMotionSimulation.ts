import {
  getVectorLength,
  scalarMultiplication,
  vectorAddition,
  vectorDeduction,
  VectorN,
} from "@/utils/maths/vector-calculation";

declare interface Vector3 extends VectorN {
  x: number;
  y: number;
  z: number;
}

enum RenderState {
  PAUSE,
  RUN,
  STOP,
}

interface MotionState {
  position: Vector3;
  velocity: Vector3;
  acceleration: Vector3;
}

declare interface callChain {
  renderState: RenderState;
  beforeRender: (index: number) => void;
  renderLoop: () => void;
  afterRender: (index: number) => void;
  readonly onSimulate: (index: number) => void;
}

/**
 * Using the simulation of motion.
 * @function
 * @param {number} length - The number of objects to be simulated.
 * @param {number} friction - The friction coefficient.
 */
const useMotionSimulation = (length: number, friction: number = 0) => {
  const getZero = () => ({ x: 0, y: 0, z: 0 });
  // usable parameters
  const states: MotionState[] = Array.from({ length: length }, () => ({
    position: getZero(),
    velocity: getZero(),
    acceleration: getZero(),
  }));
  const onSimulate = (index: number) => {
    states[index].position = vectorAddition(
      states[index].position,
      scalarMultiplication(states[index].velocity, 1 / 60)
    );
    states[index].velocity = vectorAddition(
      states[index].velocity,
      scalarMultiplication(states[index].acceleration, 1 / 60)
    );
    if (friction) {
      const speed = getVectorLength(states[index].velocity);
      const resistance = friction * Math.pow(speed, 2);
      // use friction
      if (resistance / 60 > speed) {
        states[index].velocity = { x: 0, y: 0, z: 0 };
      } else {
        states[index].velocity = vectorDeduction(
          states[index].velocity,
          scalarMultiplication(
            states[index].velocity,
            Math.cbrt(resistance) / 60
          )
        );
      }
    }
  };

  // render state controller
  const callChain: callChain = {
    renderState: RenderState.STOP,
    beforeRender: () => {},
    renderLoop: () => {},
    afterRender: () => {},
    onSimulate,
  };
  const loop = () => {
    if (callChain.renderState === RenderState.STOP) {
      for (let i = 0; i < length; i++) callChain.afterRender(i);
      return;
    } else {
      if (callChain.renderState === RenderState.RUN) {
        for (let i = 0; i < length; i++) {
          callChain.onSimulate(i);
        }
        callChain.renderLoop();
      }
      requestAnimationFrame(loop);
    }
  };
  const renderStart = () => {
    const temp = callChain.renderState;
    callChain.renderState = RenderState.RUN;
    switch (temp) {
      case RenderState.STOP:
        for (let i = 0; i < length; i++) callChain.beforeRender(i);
        requestAnimationFrame(loop);
        break;
      case RenderState.PAUSE:
        callChain.renderState = RenderState.RUN;
        break;
      default:
        break;
    }
  };
  const renderStop = () => {
    callChain.renderState = RenderState.STOP;
  };
  const renderPause = () => {
    callChain.renderState = RenderState.PAUSE;
  };

  return {
    states,
    callChain,
    renderStart,
    renderPause,
    renderStop,
  };
};

export default useMotionSimulation;
