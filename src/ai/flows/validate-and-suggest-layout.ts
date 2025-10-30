'use server';

/**
 * @fileOverview A Genkit flow for analyzing a document and suggesting layout adjustments.
 *
 * - validateAndSuggestLayout - A function that handles the layout adjustment suggestion process.
 * - ValidateAndSuggestLayoutInput - The input type for the validateAndSuggestLayout function.
 * - ValidateAndSuggestLayoutOutput - The return type for the validateAndSuggestLayout function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateAndSuggestLayoutInputSchema = z.object({
  documentContent: z
    .string()
    .describe('The content of the document to analyze.'),
  formattingRequirements: z
    .string()
    .describe(
      'Specific formatting requirements for the document, such as desired page size, margins, and padding.'
    ),
});
export type ValidateAndSuggestLayoutInput = z.infer<typeof ValidateAndSuggestLayoutInputSchema>;

const ValidateAndSuggestLayoutOutputSchema = z.object({
  suggestedAdjustments: z
    .string()
    .describe(
      'Suggested layout adjustments based on the document content and formatting requirements, including specific values for page size, margins, and padding.'
    ),
  reasoning: z
    .string()
    .describe('The reasoning behind the suggested layout adjustments.'),
});
export type ValidateAndSuggestLayoutOutput = z.infer<typeof ValidateAndSuggestLayoutOutputSchema>;

export async function validateAndSuggestLayout(
  input: ValidateAndSuggestLayoutInput
): Promise<ValidateAndSuggestLayoutOutput> {
  return validateAndSuggestLayoutFlow(input);
}

const prompt = ai.definePrompt({
  name: 'validateAndSuggestLayoutPrompt',
  input: {schema: ValidateAndSuggestLayoutInputSchema},
  output: {schema: ValidateAndSuggestLayoutOutputSchema},
  prompt: `You are an expert in document layout and formatting. Analyze the provided document content and formatting requirements, and suggest layout adjustments to optimize the document's appearance.

Document Content: {{{documentContent}}}
Formatting Requirements: {{{formattingRequirements}}}

Consider factors such as page size, margins, padding, and content density. Provide specific values for the suggested adjustments and explain the reasoning behind your suggestions.

Output the suggested adjustments in a structured format that includes the adjusted values and a clear explanation.

Include reasoning.

Here's an example of the output:
{
  "suggestedAdjustments": "Adjust page size to A4, set top/left margins to 3cm and bottom/right margins to 2cm, and add 10px padding to all paragraphs.",
  "reasoning": "A4 page size is a standard size. 3cm top/left and 2cm bottom/right margins provide a professional look. 10px padding improves readability."
}
`,
});

const validateAndSuggestLayoutFlow = ai.defineFlow(
  {
    name: 'validateAndSuggestLayoutFlow',
    inputSchema: ValidateAndSuggestLayoutInputSchema,
    outputSchema: ValidateAndSuggestLayoutOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
