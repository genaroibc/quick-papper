import Script from "next/script";
export function Model3d() {
  return (
    <>
      <Script
        type="module"
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
      ></Script>
      <Script src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js"></Script>

      <model-viewer
        src="/3d/HeroRobot.gltf"
        alt="A standing metal robot"
        auto-rotate
        camera-controls
        ar
        ios-src="/3d/HeroRobot.gltf"
        poster="/3d/HeroRobotPoster.webp"
      ></model-viewer>
    </>
  );
}
