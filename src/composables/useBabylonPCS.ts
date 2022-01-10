import { Engine, Scene, Vector3 } from "@babylonjs/core";
import * as BABYLON from "@babylonjs/core";
import { SceneInfo } from "@/sketches/sanddance/SandDance";

export default function (
  canvas: HTMLCanvasElement | null,
  length = 0
): SceneInfo {
  const engine = new Engine(canvas);
  const scene = new Scene(engine);

  const camera = new BABYLON.ArcRotateCamera(
    "Camera",
    0,
    0,
    0,
    new Vector3(0, 0, 0),
    scene
  );
  camera.setPosition(new Vector3(0, 0, 150));
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
    particle.position = new BABYLON.Vector3(
      0.5 + 0.25 * Math.random(),
      i / 5000,
      0.25 * Math.random()
    );
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
