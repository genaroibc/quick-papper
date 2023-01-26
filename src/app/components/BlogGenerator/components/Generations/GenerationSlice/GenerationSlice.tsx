import { extend } from "@/services/extend";
import { generate } from "@/services/generate";
import { summarize } from "@/services/summarize";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import styles from "./GenerationSlice.module.css";

type Props = {
  initialContent: string;
  handleDeleteSlice: () => void;
};

export function GenerationSlice({ initialContent, handleDeleteSlice }: Props) {
  const [textContent, setTextContent] = useState<string>(initialContent);
  console.log(textContent);

  const sliceRef = useRef<HTMLParagraphElement>(null);

  const handleSummarizeText = async () => {
    const regeneratedTextData = await summarize({ prompt: textContent });

    setTextContent(
      regeneratedTextData.body.generations[0].text.trim().replaceAll("-", "")
    );
  };

  const handleRegenerateText = async () => {
    const regeneratedTextData = await generate({
      generationsQuantity: 1,
      prompt: textContent
    });

    setTextContent(
      regeneratedTextData.body.generations[0].text.trim().replaceAll("-", "")
    );
  };

  const handleExtendText = async () => {
    const res = await extend({ prompt: textContent });

    setTextContent(prevText => {
      const text = res.body.generations[0].text.split("\n").pop();

      return `${prevText}\n${text?.trim().replaceAll("-", "")}`;
    });
  };

  const handleEditText = () => {
    if (sliceRef.current) {
      sliceRef.current.contentEditable = "true";
      sliceRef.current.focus();
    }
  };

  const handleTextChange = async (e: ChangeEvent<HTMLParagraphElement>) => {
    if (e.target.textContent) setTextContent(e.target.textContent);
  };

  return (
    <p
      ref={sliceRef}
      onInput={handleTextChange}
      className={styles.generationSlice}
    >
      {textContent}
      <span role="toolbar" className={styles.generationSlice__toolbar}>
        <button
          aria-label="summarize paragraph"
          onClick={handleSummarizeText}
          className={styles.generationSlice__toolbar__btn}
        >
          <Image
            src="/svg/summarize.svg"
            alt="summarize paragraph"
            title="summarize paragraph"
            width={40}
            height={40}
          />
        </button>

        <button
          aria-label="regenerate paragraph"
          onClick={handleRegenerateText}
          className={styles.generationSlice__toolbar__btn}
        >
          <Image
            src="/svg/regenerate.svg"
            alt="regenerate paragraph"
            title="regenerate paragraph"
            width={40}
            height={40}
          />
        </button>

        <button
          aria-label="extend paragraph"
          onClick={handleExtendText}
          className={styles.generationSlice__toolbar__btn}
        >
          <Image
            src="/svg/extend.svg"
            alt="extend paragraph"
            title="extend paragraph"
            width={40}
            height={40}
          />
        </button>

        <button
          aria-label="delete paragraph"
          onClick={handleDeleteSlice}
          className={styles.generationSlice__toolbar__btn}
        >
          <Image
            src="/svg/delete.svg"
            alt="delete paragraph"
            title="delete paragraph"
            width={40}
            height={40}
          />
        </button>

        <button
          aria-label="edit paragraph"
          onClick={handleEditText}
          className={styles.generationSlice__toolbar__btn}
        >
          <Image
            src="/svg/edit.svg"
            alt="edit paragraph"
            title="edit paragraph"
            width={40}
            height={40}
          />
        </button>
      </span>
    </p>
  );
}
