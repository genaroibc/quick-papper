"use client";

import { generate } from "@/services/generate";
import { cohereResponse, generateResponse } from "cohere-ai/dist/models";
import { useState } from "react";
import { Generations } from "../Generations/Generations";
import styles from "./BlogForm.module.css";

export function BlogForm() {
  const [generations, setGenerations] =
    useState<cohereResponse<generateResponse> | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // @ts-ignore
    const blogTitle = e.target["blog-title"].value.trim() + ".";
    const generationsQuantity =
      // @ts-ignore
      e.target["blog-generations-amount"].valueAsNumber;

    const generationResponse = await generate({
      prompt: blogTitle,
      generationsQuantity
    });

    setGenerations(generationResponse);
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
          placeholder="how to take care of a dog"
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

      {generations ? (
        <Generations
          generations={generations.body.generations}
          prompt={generations.body.prompt}
        />
      ) : (
        "Enter your blog params"
      )}
    </>
  );
}
