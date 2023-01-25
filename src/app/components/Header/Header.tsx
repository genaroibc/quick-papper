import Link from "next/link";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <Link href="/">Home</Link>
        <Link href="/">Showcase</Link>
        <Link href="/">Solutions</Link>
        <Link href="/">Try it</Link>
        <Link href="/">About</Link>
      </nav>
    </header>
  );
}
