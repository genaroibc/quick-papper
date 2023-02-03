import Link from "next/link";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <span>Quick</span> <span>Papper</span>
      </div>
      <nav className={styles.header__nav}>
        <Link className={styles.header__nav__link} href="/">
          Home
        </Link>
        <Link className={styles.header__nav__link} href="/">
          Showcase
        </Link>
        <Link
          className={styles.header__nav__link}
          href="https://github.com/genaroibc"
          target="_blank"
        >
          GitHub
        </Link>
      </nav>
    </header>
  );
}
