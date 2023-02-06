import { useCallback, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import { formatToHTML } from "@/utils/formatToHTML/formatToHTML";
import Image from "next/image";
import styles from "./CopyNavBar.module.css";

type CopyFormat = "HTML" | "MARKDOWN" | "PLAIN_TEXT";
type FormatterFn = (title: string, text: string) => string;

type Props = {
  text: string;
  title: string;
};

export function CopyNavBar({ text, title }: Props) {
  const handleCopyGeneration = (format: CopyFormat) => {
    const FORMAT_DICT: Record<CopyFormat, FormatterFn> = {
      HTML: (title, text) => formatToHTML({ title, text }),
      MARKDOWN: (title, text) => `# ${title}\n\n${text}`,
      PLAIN_TEXT: (title, text) => `${title}\n\n${text}`
    };

    navigator.clipboard.writeText(FORMAT_DICT[format](title, text));
    fireConfetti();
  };

  const refAnimationInstance = useRef(null);

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeConfettiShot = useCallback((particleRatio: number, opts: {}) => {
    const animationInstace = refAnimationInstance.current as unknown as (
      opts: any
    ) => void;

    refAnimationInstance.current &&
      animationInstace({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio)
      });
  }, []);

  const fireConfetti = useCallback(() => {
    makeConfettiShot(0.25, {
      spread: 26,
      startVelocity: 55
    });

    makeConfettiShot(0.2, {
      spread: 60
    });

    makeConfettiShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    makeConfettiShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    makeConfettiShot(0.1, {
      spread: 120,
      startVelocity: 45
    });
  }, [makeConfettiShot]);

  return (
    <nav className={styles.copyNavBar}>
      <button
        aria-label="copy as HTML"
        title="copy as HTML"
        onClick={() => handleCopyGeneration("HTML")}
        className={styles.copyNavBar__copyHtmlBtn}
      >
        <Image
          src="/svg/copy.svg"
          alt="add new paragraphs"
          width={40}
          height={40}
        />
      </button>
      <button
        aria-label="copy as Markdown"
        title="copy as Markdown"
        onClick={() => handleCopyGeneration("MARKDOWN")}
        className={styles.copyNavBar__copyMarkdownBtn}
      >
        <Image
          src="/svg/copy.svg"
          alt="add new paragraphs"
          width={40}
          height={40}
        />
      </button>
      <button
        aria-label="copy as plain text"
        title="copy as plain text"
        onClick={() => handleCopyGeneration("PLAIN_TEXT")}
        className={styles.copyNavBar__copyPlaintextBtn}
      >
        <Image
          src="/svg/copy.svg"
          alt="add new paragraphs"
          width={40}
          height={40}
        />
      </button>
      <ReactCanvasConfetti
        refConfetti={getInstance}
        style={{
          position: "fixed",
          pointerEvents: "none",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0
        }}
      />{" "}
    </nav>
  );
}
