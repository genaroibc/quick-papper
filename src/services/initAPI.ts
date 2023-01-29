import cohere from "cohere-ai";

export function initAPI() {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  if (!API_KEY) {
    throw new Error("'API_KEY' env variable is not defined");
  }

  cohere.init(API_KEY);
}
