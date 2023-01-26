import styles from "./BlogGenerator.module.css";
import { BlogForm } from "./components/BlogForm/BlogForm";

export function BlogGenerator() {
  return (
    <section className={styles.blogGenerator}>
      <section>
        <h3 className={styles.blogGenerator__title}>Set up your blog</h3>

        <BlogForm />
      </section>
    </section>
  );
}
