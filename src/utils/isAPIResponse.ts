import { APIResponse } from "@/types";

export function isAPIResponse(data: any): data is APIResponse {
  return data && data.statusCode && data.body && data.body.generations;
}
