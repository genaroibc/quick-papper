"use client";
import "@google/model-viewer";

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
      camera-orbit="240deg 65deg "
    />
  );
}
