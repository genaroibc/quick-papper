import { GENERATION_PROMPT_PREFIX } from "@/constants";
import { APIClient } from "@/services/APIClient";
import { APIResponse } from "@/types";
import { isAPIResponse } from "@/utils/isAPIResponse";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useState } from "react";
import styles from "./Generations.module.css";
import { GenerationLoader } from "./GenerationSlice/GenerationLoader/GenerationLoader";
import { GenerationSlice } from "./GenerationSlice/GenerationSlice";

type Props = {
  initialSlices: string[];
  prompt?: APIResponse["body"]["prompt"];
};

type GenerationSlice = { id: string; content: string };

export function Generation({ initialSlices, prompt }: Props) {
  const [loading, setLoading] = useState(false);

  const [slices, setSlices] = useState<GenerationSlice[]>(() => {
    return initialSlices.map(slice => ({ content: slice, id: nanoid() }));
  });

  const handleDeleteSlice = (sliceId: string) => {
    setSlices(currentSlices => {
      const updatedSlices = currentSlices.filter(slice => slice.id !== sliceId);
      return updatedSlices;
    });
  };

  const handleExtendGeneration = async () => {
    const lastParagraph =
      slices.at(-1)?.content ?? `${GENERATION_PROMPT_PREFIX}${prompt}.`;

    setLoading(true);

    const newSlicesResponse = await APIClient({
      action: "GENERATE",
      prompt: lastParagraph
    });

    if (isAPIResponse(newSlicesResponse)) {
      const paragraphs = newSlicesResponse.body.generations[0].text
        .trim()
        .split("\n\n");

      const newSlices = paragraphs.map(pgph => ({
        content: pgph.trim(),
        id: nanoid()
      }));

      setSlices(currentSlices => [...currentSlices, ...newSlices]);
    }
    setLoading(false);
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

        {loading && <GenerationLoader />}

        <button
          onClick={handleExtendGeneration}
          className={styles.generations__item__extendBtn}
        >
          Extend
          <Image
            src="/svg/plus.svg"
            alt="add new paragraphs"
            width={40}
            height={40}
          />
        </button>
      </article>
    </div>
  );
}
