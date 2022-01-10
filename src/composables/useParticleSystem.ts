import ParticleSystemGlobal from "@/sketches/sanddance/particle-system/ParticleSystem";
import { dataUnit, vec3 } from "@/sketches/sanddance/SandDance";

const useParticleSystem = (data: dataUnit[]) => {
  const PSG = ParticleSystemGlobal;
  PSG.bindDataset(data);

  const setPosition = (positions: vec3[]) => {
    PSG.unitArray.forEach((e, i) => e.setPosition(positions[i]));
  };

  return {
    PSG,
    setPosition,
  };
};

export default useParticleSystem;
