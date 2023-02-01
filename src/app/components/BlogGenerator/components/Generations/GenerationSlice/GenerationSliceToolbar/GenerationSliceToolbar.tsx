import styles from "./GenerationSliceToolbar.module.css";
import Image from "next/image";
import { TextContentState } from "../GenerationSlice";

type Props = {
  loading: boolean;
  handleSummarizeText: () => void;
  handleRegenerateText: () => void;
  handleExtendText: () => void;
  handleEditText: () => void;
  handleDeleteSlice: () => void;
  textContent: TextContentState;
};

export function GenerationSliceToolbar({
  loading,
  handleDeleteSlice,
  handleEditText,
  handleRegenerateText,
  handleSummarizeText,
  handleExtendText,
  textContent
}: Props) {
  return (
    <span id="toolbar" role="toolbar" className={styles.toolbar}>
      <button
        disabled={loading || Boolean(textContent.newText)}
        aria-label="summarize paragraph"
        onClick={handleSummarizeText}
        className={styles.toolbar__btn}
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
        className={styles.toolbar__btn}
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
        className={styles.toolbar__btn}
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
        className={styles.toolbar__btn}
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
        className={styles.toolbar__btn}
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
  );
}
