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
      HTML: (title, text) => formatToHTML(title, text),
      MARKDOWN: (title, text) => `# ${title}\n\n${text}`,
      PLAIN_TEXT: (title, text) => `${title}\n\n${text}`
    };

    navigator.clipboard.writeText(FORMAT_DICT[format](title, text));
  };

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
    </nav>
  );
}
