import { APIClient } from "@/services/APIClient";
import { isAPIResponse } from "@/utils/isAPIResponse";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import styles from "./GenerationSlice.module.css";

type Props = {
  initialContent: string;
  handleDeleteSlice: () => void;
};

export function GenerationSlice({ initialContent, handleDeleteSlice }: Props) {
  const [textContent, setTextContent] = useState<string>(initialContent);

  const sliceRef = useRef<HTMLParagraphElement>(null);

  const handleSummarizeText = async () => {
    const regeneratedTextData = await APIClient({
      action: "SUMMARIZE",
      prompt: textContent
    });

    if (isAPIResponse(regeneratedTextData)) {
      setTextContent(
        regeneratedTextData.body.generations[0].text.trim().replaceAll("-", "")
      );
    }
  };

  const handleRegenerateText = async () => {
    const regeneratedTextData = await APIClient({
      action: "REGENERATE",
      prompt: textContent
    });

    if (isAPIResponse(regeneratedTextData)) {
      setTextContent(
        regeneratedTextData.body.generations[0].text.trim().replaceAll("-", "")
      );
    }
  };

  const handleExtendText = async () => {
    const extendedTextData = await APIClient({
      action: "EXTEND",
      prompt: textContent
    });

    if (isAPIResponse(extendedTextData)) {
      setTextContent(prevText => {
        const text = extendedTextData.body.generations[0].text;

        return `${prevText}\n${text?.trim().replaceAll("-", "")}`;
      });
    }
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
      {textContent.trim()}
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
