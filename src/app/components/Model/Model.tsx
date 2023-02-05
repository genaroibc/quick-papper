"use client";
import "@google/model-viewer";

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

export function Model() {
  return (
    <model-viewer
      src="/3d/HeroRobot.gltf"
      alt="A standing metal robot"
      auto-rotate
      camera-controls
      ar
      ios-src="/3d/HeroRobot.gltf"
      poster="/3d/HeroRobotPoster.webp"
    ></model-viewer>
  );
}
