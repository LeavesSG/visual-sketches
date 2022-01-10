import OffscreenCanvas from "./offscreenCanvas";

export default function useImageFilter(
  src: string,
  resolution = { x: 1600, y: 800 },
  offscreen?: OffscreenCanvas
): Promise<number[]> | undefined {
  const promise: Promise<number[]> = new Promise((resolve, reject) => {
    if (!offscreen) offscreen = new OffscreenCanvas(resolution.x, resolution.y);
    const offscreenCtx = offscreen.getContext("2d");
    if (!offscreenCtx) reject();
    else {
      let pattern = [];
      offscreenCtx.clearRect(0, 0, resolution.x, resolution.y);
      const image = new Image();
      image.src = src;
      image.onload = () => {
        offscreenCtx.drawImage(image, 0, 0, resolution.x, resolution.y);
        const bufferPoints = [];
        const imageData = offscreenCtx.getImageData(
          0,
          0,
          resolution.x,
          resolution.y
        ).data;
        const edges = imageData.slice(0, 8 * resolution.x);
        const l = edges.length / 4;
        const average_r =
          edges.filter((e, i) => i % 4 === 0).reduce((a, c) => a + c, 0) / l;
        const average_g =
          edges.filter((e, i) => i % 4 === 1).reduce((a, c) => a + c, 0) / l;
        const average_b =
          edges.filter((e, i) => i % 4 === 2).reduce((a, c) => a + c, 0) / l;
        const average_a =
          edges.filter((e, i) => i % 4 === 3).reduce((a, c) => a + c, 0) / l;
        const bg_color = [average_r, average_g, average_b, average_a];
        for (let i = 0; i < imageData.length / 4; i++) {
          if (
            filterData(
              [
                imageData[4 * i],
                imageData[4 * i + 1],
                imageData[4 * i + 2],
                imageData[4 * i + 3],
              ],
              bg_color
            )
          )
            bufferPoints.push(i);
        }
        pattern = bufferPoints;
        resolve(pattern);
      };
    }
  });
  return promise;
}

function filterData(pixels: number[], bgColor: number[]) {
  if (pixels[3] < 50) return false;
  if (
    Math.abs(pixels[0] - bgColor[0]) +
      Math.abs(pixels[1] - bgColor[1]) +
      Math.abs(pixels[2] - bgColor[2]) +
      Math.abs(pixels[3] - bgColor[3]) <
    100
  )
    return false;
  return true;
}
