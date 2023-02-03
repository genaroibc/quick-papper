import { GradientTitle } from "../GradientTitle/GradientTitle";
import { Model3d } from "../Model3d/Model3d";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div>
        <h1 className={styles.hero__title}>
          Quick <span>Papper</span>
        </h1>
        <h2 className={styles.hero__subtitle}>
          Create{" "}
          <GradientTitle
            colors={["var(--terciary-color)", "var(--complement-color)"]}
          >
            high-quality
          </GradientTitle>{" "}
          articles{" "}
          <GradientTitle
            colors={["var(--terciary-color)", "var(--complement-color)"]}
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
      </div>

      <div className={styles.hero__image}>
        <Model3d />
      </div>
    </section>
  );
}
