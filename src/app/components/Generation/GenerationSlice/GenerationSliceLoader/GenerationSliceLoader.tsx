import { useEffect, useState } from "react";
import { Loader } from "@/app/components/Loader/Loader";
import styles from "./GenerationSliceLoader.module.css";

const MESSAGE_CHANGE_INTERVAL = 3800;
const LOADING_MESSAGES = [
  "parsing prompt",
  "extracting tokens",
  "detecting tone",
  "configuring parameters",
  "recovering context",
  "fetching resources",
  "generating response",
  "optimizing output"
];

export function GenerationLoader() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex(currIndex => currIndex + 1);
    }, MESSAGE_CHANGE_INTERVAL);

    return () => {
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className={styles.loaderContainer}>
      <Loader />
      <span className={styles.loaderContainer__message}>
        {LOADING_MESSAGES.at(
          messageIndex > LOADING_MESSAGES.length - 1
            ? messageIndex % LOADING_MESSAGES.length
            : messageIndex
        )}
      </span>
    </div>
  );
}
