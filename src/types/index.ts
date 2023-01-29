import {
  cohereResponse,
  error as cohereError,
  generateResponse
} from "cohere-ai/dist/models";

export type APIAction = "GENERATE" | "SUMMARIZE" | "REGENERATE" | "EXTEND";
export type APIError = cohereResponse<cohereError>;
export type APIResponse = cohereResponse<
  generateResponse & { prompt?: string }
>;
