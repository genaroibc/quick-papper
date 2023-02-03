import Script from "next/script";

// 🙈 🙈
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src: string;
          alt: string;
          "auto-rotate": boolean;
          "camera-controls": boolean;
          ar: boolean;
          "ios-src": string;
          poster: string;
        },
        HTMLElement
      >;
    }
  }
}
// 🙈 🙈

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
