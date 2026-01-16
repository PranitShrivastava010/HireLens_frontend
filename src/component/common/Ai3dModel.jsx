import '@google/model-viewer';

export default function Ai3dModel() {
  return (
    <model-viewer
      src="/models/final-fixed.glb"
      alt="AI Logo 3D"
      auto-rotate
      rotation-per-second="30deg"
      interaction-prompt="none"
      environment-image="neutral"
      disable-zoom
      disable-pan
      disable-tap
      background-color="transparent"
      exposure="1.2"
      style={{
        width: "100%",
        height: "140px",
        display: "block",
      }}
    />
  );
}
