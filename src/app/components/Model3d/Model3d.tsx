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
        src="/Telescope.gltf"
        alt="VR Headset"
        auto-rotate
        camera-controls
        ar
        ios-src="/Telescope.gltf"
      ></model-viewer>
    </>
  );
}
