<template>
  <div class="screen">
    <canvas ref="canvas" class="canvas full" />
    <img
      ref="image"
      src="@/sketches/particles-globe/globe-map.png"
      width="400"
      height="200"
      :style="{ position: 'absolute', opacity: 0 }"
    />
    <!-- <canvas ref="floatCanvas" class="canvas float" /> -->
  </div>
</template>

<style lang="less" scoped src="./particles-globe.less"></style>

<script lang="ts">
import useBabylonScene from "@/composables/useBabylonScene";
import useImageFilter from "@/composables/useImageFilter";
import { defineComponent, onMounted, reactive, ref, Ref } from "vue";
import * as BABYLON from "@babylonjs/core";

export default defineComponent({
  setup() {
    const image: Ref<HTMLImageElement | null> = ref(null);
    const canvas: Ref<HTMLCanvasElement | null> = ref(null);
    const resolution = reactive({ x: 1920, y: 1080 });

    const floatCanvas = ref<HTMLCanvasElement | null>(null);

    const renderBabylonScene = async () => {
      const globe_src = image.value?.src;
      if (!globe_src) return;
      const pattern = await useImageFilter(globe_src, resolution, undefined);

      if (!pattern) return;

      const earthGroup: BABYLON.Mesh[] = [];

      const interval = 5;
      const filtered = pattern.filter((e) => {
        const theta = (Math.floor(e / resolution.x) / resolution.y) * Math.PI;
        const finalInterval = Math.floor(interval / Math.sin(theta));
        return (
          (e % resolution.x) % finalInterval === 0 &&
          Math.floor(e / resolution.x) % interval === 0
        );
      });

      if (floatCanvas.value) {
        const ctx = floatCanvas.value.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, 800, 600);
          ctx.fillStyle = "black";
          console.log(floatCanvas);
          filtered.forEach((e) => {
            const x = ((e % resolution.x) / resolution.x) * 300;
            const y = (Math.floor(e / resolution.x) / resolution.y) * 150;
            ctx.fillRect(x, y, 0.5, 0.5);
          });
        }
      }

      const { scene, render } = useBabylonScene(canvas.value, false, false);

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

      const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {
        diameter: 199,
      });

      earthGroup.push(sphere);

      const myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
      myMaterial.alpha = 0.8;
      myMaterial.emissiveColor = new BABYLON.Color3(0.08, 0.16, 0.16);
      sphere.material = myMaterial;

      const paths = [];
      for (let t = 0; t < Math.PI; t += Math.PI / 20) {
        const path = [];
        for (let a = 0; a < 2 * Math.PI; a += Math.PI / 20) {
          let x = 100 * Math.cos(a) * Math.sin(t);
          let z = 100 * Math.sin(a) * Math.sin(t);
          let y = 100 * Math.cos(t);
          path.push(new BABYLON.Vector3(x, y, z));
        }
        path.push(path[0]); // close circle
        paths.push(path);
      }

      const ribbon = BABYLON.MeshBuilder.CreateRibbon("ribbon", {
        pathArray: paths,
        closePath: true,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE,
      });
      ribbon.material = new BABYLON.StandardMaterial("", scene);
      (ribbon.material as any).emissiveColor = new BABYLON.Color4(
        0.43,
        0.86,
        0.86,
        0.8
      );
      ribbon.material.wireframe = true;
      earthGroup.push(ribbon);

      const PCS = new BABYLON.PointsCloudSystem("PCS", 3, scene);

      let theta, phi;
      const radius = 100;
      const initFunc = function (
        particle: { position: BABYLON.Vector3; color: BABYLON.Color4 },
        idx: number
      ) {
        phi = ((filtered[idx] % resolution.x) / resolution.x) * Math.PI * 2;
        theta =
          (Math.floor(filtered[idx] / resolution.x) / resolution.y) * Math.PI;
        particle.position = new BABYLON.Vector3(
          radius * Math.cos(phi) * Math.sin(theta),
          radius * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta)
        );
        particle.color = new BABYLON.Color4(
          0.38 + 0.01 * phi,
          0.81 - 0.01 * phi,
          0.81 + 0.01 * phi,
          0.8
        );
      };

      PCS.initParticles();

      PCS.addPoints(filtered.length || 0, initFunc);

      PCS.initParticles = () => {
        for (let p = 0; p < PCS.nbParticles; p++) {
          const particle = PCS.particles[p];
          particle.color = new BABYLON.Color4(
            Math.random(),
            Math.random(),
            Math.random(),
            0.7
          );
        }
      };
      await PCS.buildMeshAsync();
      earthGroup.push(PCS.mesh);
      scene.onBeforeRenderObservable.add(() => {
        PCS.setParticles();
      });

      // animations
      const frameRate = 30;
      const rotateY = new BABYLON.Animation(
        "rotateY",
        "rotation",
        frameRate,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
      );
      const keyFrames = [
        {
          frame: 0,
          value: new BABYLON.Vector3(0, 0, 0),
        },
        {
          frame: frameRate * 30,
          value: new BABYLON.Vector3(0, -Math.PI, -Math.PI / 10),
        },
        {
          frame: frameRate * 60,
          value: new BABYLON.Vector3(0, -Math.PI * 2, Math.PI / 10),
        },
      ];
      rotateY.setKeys(keyFrames);

      earthGroup.forEach((e) => {
        e.animations.push(rotateY);
        scene.beginAnimation(e, 0, frameRate * 60, true);
      });

      render();
    };

    onMounted(renderBabylonScene);

    return {
      canvas,
      image,
      floatCanvas,
    };
  },
});
</script>
