import { GradientTitle } from "../GradientTitle/GradientTitle";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.hero__title}>Quick Papper</h1>
      <h2 className={styles.hero__subtitle}>
        Create{" "}
        <GradientTitle
          colors={["var(--terciary-color)", "var(--secondary-color)"]}
        >
          high-quality
        </GradientTitle>{" "}
        articles{" "}
        <GradientTitle
          colors={["var(--terciary-color)", "var(--secondary-color)"]}
        >
          faster
        </GradientTitle>{" "}
        than ever
      </h2>

      <p>✋ Stop wasting time!</p>
      <p>
        Generate the AI-powered draft that you need to get inspired and take
        your productivity to the moon 🚀
      </p>

      <button>Try it now</button>
    </section>
  );
}
