"use client";
import { APIClient } from "@/services/APIClient";
import { useState } from "react";
import { Generations } from "../Generations/Generations";
import { APIResponse } from "@/types";
import { isAPIResponse } from "@/utils/isAPIResponse";
import styles from "./BlogForm.module.css";
import { Loader } from "@/app/components/Loader/Loader";

export function BlogForm() {
  const [blogData, setBlogData] = useState<APIResponse["body"] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setBlogData(null);
    const form = e.target as HTMLFormElement;
    const blogTitle = form["blog-title"]?.value.trim() + ".";
    const generationsQuantity = form["blog-generations-amount"]?.valueAsNumber;

    setLoading(true);

    const response = await APIClient({
      action: "GENERATE",
      prompt: blogTitle,
      generationsQuantity
    });

    if (isAPIResponse(response)) {
      setBlogData(response.body);
    }

    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.blogForm}>
        <label className={styles.blogForm__label} htmlFor="blog-title">
          Blog title
        </label>
        <input
          className={styles.blogForm__input}
          type="text"
          name="blog-title"
          id="blog-title"
          placeholder="how to make a chocolate cake"
          required
          minLength={20}
          maxLength={90}
        />

        <label
          className={styles.blogForm__label}
          htmlFor="blog-generations-amount"
        >
          Number of generations
        </label>
        <input
          className={styles.blogForm__input}
          type="number"
          name="blog-generations-amount"
          id="blog-generations-amount"
          defaultValue={1}
          min={1}
          max={5}
        />

        <button className={styles.blogForm__submitBtn} type="submit">
          Generate draft
        </button>
      </form>

      {loading ? (
        <Loader />
      ) : blogData ? (
        <Generations
          generations={blogData.generations}
          prompt={blogData.prompt}
        />
      ) : (
        <p>Enter your blog params</p>
      )}
    </>
  );
}
