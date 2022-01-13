import * as BABYLON from "@babylonjs/core";

export default function (
  canvas: HTMLCanvasElement | null,
  defaultCamera = false,
  defaultLight = false
): {
  scene: BABYLON.Scene;
  engine: BABYLON.Engine;
  render: () => void;
} {
  const engine = new BABYLON.Engine(canvas);
  const scene = new BABYLON.Scene(engine);

  scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

  if (defaultCamera) {
    // Parameters: name, alpha, beta, radius, target position, scene
    const camera = new BABYLON.ArcRotateCamera(
      "Camera",
      0,
      0,
      10,
      new BABYLON.Vector3(0, 0, 0),
      scene
    );
    // Positions the camera overwriting alpha, beta, radius
    camera.setPosition(new BABYLON.Vector3(300, 0, 0));
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
  }

  if (defaultLight) {
    new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 10, 0), scene);
    new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, -10, 0), scene);
    // new BABYLON.PointLight("pointLight", new BABYLON.Vector3(1, 1, 300), scene);
  }

  const render = () => {
    engine.runRenderLoop(() => {
      scene.render();
    });
  };

  return {
    engine: engine,
    scene: scene,
    render,
  };
}
