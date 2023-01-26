import cohere from "cohere-ai";
import { GENERATION_PROMPT_PREFIX } from "../constants";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

if (!API_KEY) {
  throw new Error("'API_KEY' env variable is not defined");
}

cohere.init(API_KEY);

type Params = {
  prompt: string;
  generationsQuantity: number;
};

export async function generate({ prompt, generationsQuantity }: Params) {
  const response = await cohere.generate({
    prompt: `${GENERATION_PROMPT_PREFIX}${prompt}`,
    model: "xlarge",
    max_tokens: 450,
    temperature: 0.1,
    return_likelihoods: "ALL",
    num_generations: generationsQuantity,
    frequency_penalty: 0.8,
    presence_penalty: 0.7,
    end_sequences: []
  });

  return response;
}
