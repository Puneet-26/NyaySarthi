'use server';

/**
 * @fileOverview A legal clause simplification AI agent for a layman's view.
 *
 * - simplifyLegalClause - A function that simplifies a legal clause.
 * - SimplifyLegalClauseInput - The input type for the simplifyLegalClause function.
 * - SimplifyLegalClauseOutput - The return type for the simplifyLegalClause function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimplifyLegalClauseInputSchema = z.object({
  clause: z.string().describe('The legal clause to simplify.'),
});
export type SimplifyLegalClauseInput = z.infer<typeof SimplifyLegalClauseInputSchema>;

const SimplifyLegalClauseOutputSchema = z.object({
  simplifiedExplanation: z
    .string()
    .describe('A simplified explanation of the legal clause.'),
});
export type SimplifyLegalClauseOutput = z.infer<typeof SimplifyLegalClauseOutputSchema>;

export async function simplifyLegalClause(
  input: SimplifyLegalClauseInput
): Promise<SimplifyLegalClauseOutput> {
  return simplifyLegalClauseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simplifyLegalClausePrompt',
  input: {schema: SimplifyLegalClauseInputSchema},
  output: {schema: SimplifyLegalClauseOutputSchema},
  prompt: `You are a legal expert skilled at simplifying complex legal jargon into plain language.

  Please provide a simplified explanation of the following legal clause:

  {{clause}}

  Your explanation should be easily understandable by someone with no legal background, clarifying any potential risks, ambiguities, and implications.`,
});

const simplifyLegalClauseFlow = ai.defineFlow(
  {
    name: 'simplifyLegalClauseFlow',
    inputSchema: SimplifyLegalClauseInputSchema,
    outputSchema: SimplifyLegalClauseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
