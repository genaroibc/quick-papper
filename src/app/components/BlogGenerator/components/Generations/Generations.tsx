import { GENERATION_PROMPT_PREFIX } from "@/constants";
import { cohereResponse, generateResponse } from "cohere-ai/dist/models";
import styles from "./Generations.module.css";

type Props = {
  generations: cohereResponse<generateResponse>["body"]["generations"];
  prompt: string;
};

export function Generations({ generations, prompt }: Props) {
  return (
    <div className={styles.generations}>
      {generations.map(({ text }, i) => (
        <article key={i} className={styles.generations__item}>
          <h4 className={styles.generations__item__title}>
            {prompt
              .replace(`${GENERATION_PROMPT_PREFIX}`, "")
              .replaceAll(".", "")}
          </h4>
          <p className={styles.generations__item__content}>{text.trim()}...</p>
        </article>
      ))}
    </div>
  );
}
