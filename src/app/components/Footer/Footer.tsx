import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.footer__pgph}>
        Developed by{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/genaroibc"
        >
          Genaro Bonavita
        </a>
      </p>

      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/genaroibc/quick-paper"
      >
        View repo
      </a>
    </footer>
  );
}
