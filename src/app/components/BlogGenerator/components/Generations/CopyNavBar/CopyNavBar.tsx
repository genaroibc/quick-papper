import { formatTextToHTML } from "@/utils/formatToHTML/formatToHTML";
import { formatTextToMarkDown } from "@/utils/formatToMarkDown/formatToMarkDown";
import Image from "next/image";
import styles from "./CopyNavBar.module.css";

type CopyFormat = "HTML" | "MARKDOWN" | "PLAIN_TEXT";
type FormatterFn = (text: string) => string;

type Props = {
  text: string;
  title: string;
};

export function CopyNavBar({ text, title }: Props) {
  const handleCopyGeneration = (format: CopyFormat) => {
    const FORMAT_DICT: Record<CopyFormat, FormatterFn> = {
      HTML: text => formatTextToHTML(text, title),
      MARKDOWN: text => formatTextToMarkDown(text, title),
      PLAIN_TEXT: text => `${title}\n\n${text}`
    };

    navigator.clipboard.writeText(FORMAT_DICT[format](text));
  };

  return (
    <nav className={styles.copyNavBar}>
      <button
        onClick={() => handleCopyGeneration("HTML")}
        className={styles.generations__item__copyTextBtn}
      >
        Copy as HTML
        <Image
          src="/svg/plus.svg"
          alt="add new paragraphs"
          width={40}
          height={40}
        />
      </button>
      <button
        onClick={() => handleCopyGeneration("MARKDOWN")}
        className={styles.generations__item__copyTextBtn}
      >
        Copy as MarkDown
        <Image
          src="/svg/plus.svg"
          alt="add new paragraphs"
          width={40}
          height={40}
        />
      </button>
      <button
        onClick={() => handleCopyGeneration("PLAIN_TEXT")}
        className={styles.generations__item__copyTextBtn}
      >
        Copy as Plain text
        <Image
          src="/svg/plus.svg"
          alt="add new paragraphs"
          width={40}
          height={40}
        />
      </button>
    </nav>
  );
}
