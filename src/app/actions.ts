"use server";

import { validateAndSuggestLayout, ValidateAndSuggestLayoutInput, ValidateAndSuggestLayoutOutput } from "@/ai/flows/validate-and-suggest-layout";
import { z } from "zod";

const inputSchema = z.object({
  documentContent: z.string().min(10, { message: "Document content is too short." }),
  formattingRequirements: z.string().min(5, { message: "Please describe your formatting requirements." }),
});

export async function getLayoutSuggestions(
  prevState: any,
  formData: FormData
): Promise<{
  data: ValidateAndSuggestLayoutOutput | null;
  error: string | null;
}> {
  const parsed = inputSchema.safeParse({
    documentContent: formData.get("documentContent"),
    formattingRequirements: formData.get("formattingRequirements"),
  });

  if (!parsed.success) {
    return { data: null, error: parsed.error.flatten().fieldErrors.toString() };
  }

  const input: ValidateAndSuggestLayoutInput = parsed.data;

  try {
    const result = await validateAndSuggestLayout(input);
    return { data: result, error: null };
  } catch (e: any) {
    console.error(e);
    return { data: null, error: "An error occurred while communicating with the AI. Please try again." };
  }
}
