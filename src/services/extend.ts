import cohere from "cohere-ai";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

if (!API_KEY) {
  throw new Error("'API_KEY' env variable is not defined");
}

cohere.init(API_KEY);

type Params = {
  prompt: string;
};

export async function extend({ prompt }: Params) {
  const response = await cohere.generate({
    prompt,
    model: "xlarge",
    max_tokens: 140,
    temperature: 0.4,
    frequency_penalty: 0.8,
    presence_penalty: 0.7,
    stop_sequences: ["--"]
  });

  return response;
}
