import { GENERATION_PROMPT_PREFIX } from "@/constants";
import { APIResponse } from "@/types";
import { nanoid } from "nanoid";
import { useState } from "react";
import styles from "./Generations.module.css";
import { GenerationSlice } from "./GenerationSlice/GenerationSlice";

type Props = {
  initialSlices: string[];
  prompt?: APIResponse["body"]["prompt"];
};

type GenerationSlice = { id: string; content: string };

export function Generation({ initialSlices, prompt }: Props) {
  const [slices, setSlices] = useState<GenerationSlice[]>(() => {
    return initialSlices.map(slice => ({ content: slice, id: nanoid() }));
  });

  const handleDeleteSlice = (sliceId: string) => {
    setSlices(currentSlices => {
      const updatedSlices = currentSlices.filter(slice => slice.id !== sliceId);
      return updatedSlices;
    });
  };

  return (
    <div className={styles.generations}>
      <article className={styles.generations__item}>
        <h4 className={styles.generations__item__title}>
          {prompt &&
            prompt
              .trim()
              .replace(`${GENERATION_PROMPT_PREFIX}`, "")
              .replaceAll(".", "")}
        </h4>

        {slices.map(({ id, content }) => (
          <GenerationSlice
            handleDeleteSlice={() => handleDeleteSlice(id)}
            key={id}
            initialContent={content.trim()}
          />
        ))}
      </article>
    </div>
  );
}
