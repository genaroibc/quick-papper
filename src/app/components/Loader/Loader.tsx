import styles from "./Loader.module.css";

export function Loader() {
  return (
    <svg
      className={styles.loader}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle cx="31" cy="50" fill="#005547" r="19">
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1.0204081632653061s"
          keyTimes="0;0.5;1"
          values="31;69;31"
          begin="-0.5102040816326531s"
        ></animate>
      </circle>
      <circle cx="69" cy="50" fill="#00896d" r="19">
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1.0204081632653061s"
          keyTimes="0;0.5;1"
          values="31;69;31"
          begin="0s"
        ></animate>
      </circle>
      <circle cx="31" cy="50" fill="#005547" r="19">
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1.0204081632653061s"
          keyTimes="0;0.5;1"
          values="31;69;31"
          begin="-0.5102040816326531s"
        ></animate>
        <animate
          attributeName="fill-opacity"
          values="0;0;1;1"
          calcMode="discrete"
          keyTimes="0;0.499;0.5;1"
          dur="1.0204081632653061s"
          repeatCount="indefinite"
        ></animate>
      </circle>
    </svg>
  );
}
