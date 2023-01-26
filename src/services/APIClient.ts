import { GENERATION_PROMPT_PREFIX } from "@/constants";
import cohere from "cohere-ai";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

if (!API_KEY) {
  throw new Error("'API_KEY' env variable is not defined");
}

cohere.init(API_KEY);

interface CommonParams {
  prompt: string;
}

interface GenerateParams extends CommonParams {
  generationsQuantity: number;
}

export const APIClient = {
  async summarize({ prompt }: CommonParams) {
    const PRESET_PROMPT = `
  Passage: Is Wordle getting tougher to solve? Players seem to be convinced that the game has gotten harder in recent weeks ever since The New York Times bought it from developer Josh Wardle in late January. The Times has come forward and shared that this likely isn't the case. That said, the NYT did mess with the back end code a bit, removing some offensive and sexual language, as well as some obscure words There is a viral thread claiming that a confirmation bias was at play. One Twitter user went so far as to claim the game has gone to "the dusty section of the dictionary" to find its latest words.

  TLDR: Wordle has not gotten more difficult to solve, but there are users that are unnhappy with the purchase of Wordle by The New York Times.
  --
  Passage: ArtificialIvan, a seven-year-old, London-based payment and expense management software company, has raised $190 million in Series C funding led by ARG Global, with participation from D9 Capital Group and Boulder Capital. Earlier backers also joined the round, including Hilton Group, Roxanne Capital, Paved Roads Ventures, Brook Partners, and Plato Capital.

  TLDR: ArtificialIvan has raised $190 million in Series C funding. This will let the company to hire more employees to grow faster.
  --
  Passage: The National Weather Service announced Tuesday that a freeze warning is in effect for the Bay Area, with freezing temperatures expected in these areas overnight. Temperatures could fall into the mid-20s to low 30s in some areas. In anticipation of the hard freeze, the weather service warns people to take action now.

  TLDR: The bay area will suffer a hard freeze and low temperature. It will be 20/30 degrees under zero in some areas.
  --
  Passage: To make a delicious cake properly, you need the following six ingredients: Flour, sugar, eggs, milk and an ingredient to give it your own touch. It can be chocolate, vanilla, lemon, or whatever you like. It's just to give it a rich flavour.

  TLDR: To make a cake you need five ingredients and one more to give it flavour. You can choose any ingredient.
  --
  Passage: ${prompt}.

  TLDR:`;

    const response = await cohere.generate({
      prompt: PRESET_PROMPT,
      model: "xlarge",
      max_tokens: 300,
      temperature: 0.4,
      frequency_penalty: 0.8,
      presence_penalty: 0.7,
      stop_sequences: ["--"]
    });

    return response;
  },
  async regenerate({ prompt }: CommonParams) {
    const PRESET_PROMPT = `
  Passage: Is Wordle getting tougher to solve? Players seem to be convinced that the game has gotten harder in recent weeks ever since The New York Times bought it from developer Josh Wardle in late January. The Times has come forward and shared that this likely isn't the case. That said, the NYT did mess with the back end code a bit, removing some offensive and sexual language, as well as some obscure words There is a viral thread claiming that a confirmation bias was at play. One Twitter user went so far as to claim the game has gone to "the dusty section of the dictionary" to find its latest words.

  TLDR: Wordle has not gotten more difficult to solve, but there are users that are unnhappy with the purchase of Wordle by the New York Times.
  --
  Passage: ArtificialIvan, a seven-year-old, London-based payment and expense management software company, has raised $190 million in Series C funding led by ARG Global, with participation from D9 Capital Group and Boulder Capital. Earlier backers also joined the round, including Hilton Group, Roxanne Capital, Paved Roads Ventures, Brook Partners, and Plato Capital.

  TLDR: ArtificialIvan has raised $190 million in Series C funding. This will let the company to hire more employees to grow faster.
  --
  Passage: The National Weather Service announced Tuesday that a freeze warning is in effect for the Bay Area, with freezing temperatures expected in these areas overnight. Temperatures could fall into the mid-20s to low 30s in some areas. In anticipation of the hard freeze, the weather service warns people to take action now.

  TLDR: The bay area will suffer a hard freeze and low temperature. It will be 20/30 degrees under zero in some areas. The weather service warns people to get prepared and take action now.
  --
  Passage: To make a delicious cake properly, you need the following six ingredients: Flour, sugar, eggs, milk and an ingredient to give it your own touch. It can be chocolate, vanilla, lemon, or whatever you like. It's just to give it a rich flavour.

  TLDR: To make a cake you need five ingredients and one more to give it flavour. You can choose the ingredient. Make sure to choose one that is sweet and soft, like lemon, vanilla or chocolate.
  --
  Passage: ${prompt}.

  TLDR:`;

    const response = await cohere.generate({
      prompt: PRESET_PROMPT,
      model: "xlarge",
      max_tokens: 300,
      temperature: 0.4,
      frequency_penalty: 0.8,
      presence_penalty: 0.7,
      stop_sequences: ["--"]
    });

    return response;
  },
  async generate({ prompt, generationsQuantity }: GenerateParams) {
    const response = await cohere.generate({
      prompt: `${GENERATION_PROMPT_PREFIX}${prompt}`,
      model: "xlarge",
      max_tokens: 450,
      temperature: 0.4,
      return_likelihoods: "NONE",
      num_generations: generationsQuantity,
      frequency_penalty: 0.8,
      presence_penalty: 0.7,
      end_sequences: []
    });

    return response;
  },
  async extend({ prompt }: CommonParams) {
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
};
