'use server';
/**
 * @fileOverview A Genkit flow for simplifying a legal document analysis.
 *
 * - simplifyAnalysis: An async function to initiate the simplification flow.
 * - SimplifyAnalysisInput: The input type for the simplifyAnalysis function.
 * - SimplifyAnalysisOutput: The return type for the simplifyAnalysis function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SimplifiedClauseSchema = z.object({
  clauseNumber: z.number().describe('The number of the clause.'),
  simplifiedExplanation: z.string().describe('A simplified explanation of the clause.'),
  riskLevel: z.enum(['High', 'Medium', 'Low']).describe('The risk level of the clause.'),
});

const SimplifyAnalysisInputSchema = z.object({
  analysis: z.string().describe('The JSON string of the full analysis report.'),
});
export type SimplifyAnalysisInput = z.infer<typeof SimplifyAnalysisInputSchema>;

const SimplifyAnalysisOutputSchema = z.object({
  documentTitle: z.string().describe('The title or subject of the document.'),
  overallRisk: z.enum(['High', 'Medium', 'Low']).describe('The overall risk assessment for the document.'),
  summary: z.string().describe('A brief, high-level summary of the document analysis.'),
  simplifiedClauses: z.array(SimplifiedClauseSchema).describe('An array of simplified explanations for each clause.'),
});
export type SimplifyAnalysisOutput = z.infer<typeof SimplifyAnalysisOutputSchema>;

export async function simplifyAnalysis(input: SimplifyAnalysisInput): Promise<SimplifyAnalysisOutput> {
  return simplifyAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simplifyAnalysisPrompt',
  input: { schema: SimplifyAnalysisInputSchema },
  output: { schema: SimplifyAnalysisOutputSchema },
  prompt: `You are a legal expert who specializes in summarizing complex legal analyses into simple, actionable summaries for non-lawyers.

  You will receive a JSON object containing a detailed clause-by-clause risk analysis of a legal document. Your task is to transform this detailed analysis into a simplified summary that is easy to understand.

  From the provided analysis, you must:
  1.  **Identify Document Title**: Determine a suitable title for the document.
  2.  **Assess Overall Risk**: Based on the risk levels of individual clauses, determine an overall risk level for the document ('High', 'Medium', or 'Low').
  3.  **Write a High-Level Summary**: Provide a brief overview of the document's purpose and the key findings of the analysis.
  4.  **Simplify Each Clause**: For every clause in the analysis, create a "simplifiedExplanation" that explains the core meaning and implications of the clause in plain English. Include the original clause number and risk level.

  Here is the full analysis data:
  {{{analysis}}}

  Please structure your output as a single JSON object that strictly follows the provided output schema.`,
});

const simplifyAnalysisFlow = ai.defineFlow(
  {
    name: 'simplifyAnalysisFlow',
    inputSchema: SimplifyAnalysisInputSchema,
    outputSchema: SimplifyAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
