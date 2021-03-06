import * as BABYLON from "@babylonjs/core";
import { SceneInfo } from "@/sketches/sanddance/SandDance";

export default function (
  canvas: HTMLCanvasElement | null,
  length = 0
): SceneInfo {
  const engine = new BABYLON.Engine(canvas);
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera(
    "Camera",
    0,
    0,
    0,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );
  camera.setPosition(new BABYLON.Vector3(0, 0, 150));
  camera.attachControl(canvas, true);
  camera.minZ = 0.1;

  scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

  new BABYLON.HemisphericLight(
    "HemiLight",
    new BABYLON.Vector3(0, 0, -1),
    scene
  );
  new BABYLON.HemisphericLight("directio", new BABYLON.Vector3(0, 0, 1), scene);

  const SPS = new BABYLON.PointsCloudSystem("pcs", 2, scene);

  const myfunc = function (
    particle: { position: unknown; color: unknown },
    i: number
  ) {
    const n = Math.floor((Math.random() * 100) % 100);
    const x = ((Math.PI * 2 * 0.618 * n) % (Math.PI * 2)) * 100;
    const y = n;
    const z = 0;
    particle.position = new BABYLON.Vector3(x, y, z);
    particle.color = new BABYLON.Color4(1, 1, 1, 0.8);
  };

  SPS.addPoints(length, myfunc);
  SPS.buildMeshAsync();

  // initiate particles function

  engine.runRenderLoop(() => {
    scene.render();
  });

  scene.onBeforeRenderObservable.add(() => {
    SPS.setParticles();
  });

  return {
    engine: engine,
    scene: scene,
    ps: SPS,
  };
}
