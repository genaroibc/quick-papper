import { APIClient } from "@/services/APIClient";
import { isAPIResponse } from "@/utils/isAPIResponse";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { GenerationLoader } from "./GenerationLoader/GenerationLoader";
import styles from "./GenerationSlice.module.css";

type Props = {
  initialContent: string;
  handleDeleteSlice: () => void;
};

type TextContentState = {
  currentText: string;
  newText: string | null;
};

export function GenerationSlice({ initialContent, handleDeleteSlice }: Props) {
  const [textContent, setTextContent] = useState<TextContentState>({
    currentText: initialContent,
    newText: null
  });

  const [textToEdit, setTextToEdit] = useState("");

  const [loading, setLoading] = useState(false);

  const sliceRef = useRef<HTMLParagraphElement>(null);

  const handleSummarizeText = async () => {
    setLoading(true);
    const regeneratedTextData = await APIClient({
      action: "SUMMARIZE",
      prompt: textContent.currentText
    });

    if (isAPIResponse(regeneratedTextData)) {
      setTextContent(({ currentText }) => {
        return {
          currentText,
          newText: regeneratedTextData.body.generations[0].text
            .trim()
            .replaceAll("-", "")
        };
      });
    }
    setLoading(false);
  };

  const handleRegenerateText = async () => {
    setLoading(true);
    const regeneratedTextData = await APIClient({
      action: "REGENERATE",
      prompt: textContent.currentText
    });

    if (isAPIResponse(regeneratedTextData)) {
      setTextContent(({ currentText }) => {
        return {
          currentText,
          newText: regeneratedTextData.body.generations[0].text
            .trim()
            .replaceAll("-", "")
        };
      });
    }
    setLoading(false);
  };

  const handleExtendText = async () => {
    setLoading(true);
    const extendedTextData = await APIClient({
      action: "EXTEND",
      prompt: textContent.currentText
    });

    if (isAPIResponse(extendedTextData)) {
      setTextContent(({ currentText }) => {
        const text = extendedTextData.body.generations[0].text;

        return {
          currentText,
          newText: `${currentText}\n${text?.trim().replaceAll("-", "")}`
        };
      });
    }
    setLoading(false);
  };

  const handleEditText = () => {
    if (sliceRef.current) {
      sliceRef.current.contentEditable = "true";
      sliceRef.current.focus();

      sliceRef.current.textContent = textContent.currentText;

      setTextContent(currentState => {
        return { ...currentState, newText: currentState.currentText };
      });
    }
  };

  const handleTextChange = async (e: ChangeEvent<HTMLParagraphElement>) => {
    if (e.target.textContent) {
      setTextToEdit(e.target.textContent);
    }
  };

  const handleAcceptNewText = () => {
    setTextContent(currentState => {
      if (textToEdit) {
        return { newText: null, currentText: textToEdit };
      }

      if (currentState.newText) {
        return { currentText: currentState.newText, newText: null };
      }

      return currentState;
    });

    setTextToEdit("");
    const editPgph = sliceRef.current;

    if (editPgph) {
      editPgph.textContent = "";
      editPgph.contentEditable = "false";
    }
  };

  const handleDiscardNewText = () => {
    if (sliceRef.current?.textContent) {
      sliceRef.current.textContent = "";
    }
    setTextContent(currentState => {
      return { ...currentState, newText: null };
    });
  };

  return (
    <div onInput={handleTextChange} className={styles.generationSlice}>
      {loading ? (
        <>
          <GenerationLoader />
          <p className={styles.generationSlice__loadingPgph} ref={sliceRef}>
            {textContent.currentText.trim()}
          </p>
        </>
      ) : (
        <>
          <p className={styles.generationSlice__pgph}>
            {textContent.currentText.trim()}
          </p>
          <div className={styles.generationSlice__newPgphContainer}>
            <p ref={sliceRef}>{textContent.newText}</p>

            {textContent.newText && (
              <nav className={styles.generationSlice__newPgphContainer__navbar}>
                <button
                  className={
                    styles.generationSlice__newPgphContainer__navbar__acceptChangesBtn
                  }
                  onClick={handleAcceptNewText}
                >
                  Accept changes
                  <Image
                    src="/svg/accept.svg"
                    alt="accept changes"
                    width={30}
                    height={30}
                  />
                </button>
                <button
                  className={
                    styles.generationSlice__newPgphContainer__navbar__discardChangesBtn
                  }
                  onClick={handleDiscardNewText}
                >
                  Discard changes
                  <Image
                    src="/svg/trash.svg"
                    alt="discard changes"
                    width={30}
                    height={30}
                  />
                </button>
              </nav>
            )}
          </div>
        </>
      )}
      <span role="toolbar" className={styles.generationSlice__toolbar}>
        <button
          disabled={loading || Boolean(textContent.newText)}
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
          disabled={loading || Boolean(textContent.newText)}
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
          disabled={loading || Boolean(textContent.newText)}
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
          disabled={loading || Boolean(textContent.newText)}
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
          disabled={loading || Boolean(textContent.newText)}
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
    </div>
  );
}
