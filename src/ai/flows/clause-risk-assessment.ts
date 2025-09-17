'use server';

/**
 * @fileOverview This file defines a Genkit flow for assessing the risk level of clauses in legal documents.
 *
 * It includes:
 * - `assessClauseRisk`: An async function to initiate the clause risk assessment flow.
 * - `ClauseRiskAssessmentInput`: The input type for the assessClauseRisk function.
 * - `ClauseRiskAssessmentOutput`: The output type for the assessClauseRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClauseRiskAssessmentInputSchema = z.object({
  clauseText: z
    .string()
    .describe('The text of the legal clause to be assessed.'),
});
export type ClauseRiskAssessmentInput = z.infer<typeof ClauseRiskAssessmentInputSchema>;

const ClauseRiskAssessmentOutputSchema = z.object({
  riskLevel: z
    .enum(['High', 'Medium', 'Low'])
    .describe('The assessed risk level of the clause.'),
  ambiguities: z
    .string()
    .describe('A description of any ambiguities found in the clause.'),
  missingTerms: z
    .string()
    .describe('A description of any missing terms in the clause.'),
  legalPitfalls: z
    .string()
    .describe('A description of any potential legal pitfalls in the clause.'),
  suggestedImprovements: z
    .string()
    .describe('Suggested improvements for the clause to mitigate risks.'),
});
export type ClauseRiskAssessmentOutput = z.infer<typeof ClauseRiskAssessmentOutputSchema>;

export async function assessClauseRisk(input: ClauseRiskAssessmentInput): Promise<ClauseRiskAssessmentOutput> {
  return assessClauseRiskFlow(input);
}

const assessClauseRiskPrompt = ai.definePrompt({
  name: 'assessClauseRiskPrompt',
  input: {schema: ClauseRiskAssessmentInputSchema},
  output: {schema: ClauseRiskAssessmentOutputSchema},
  prompt: `You are an expert legal analyst specializing in risk assessment for legal documents.

You will receive a clause from a legal document and must assess its risk level, identify ambiguities and missing terms, highlight potential legal pitfalls, and suggest improvements.

Clause Text: {{{clauseText}}}

Respond with the following structure:
{
  "riskLevel": "High|Medium|Low",
  "ambiguities": "Description of any ambiguities",
  "missingTerms": "Description of any missing terms",
  "legalPitfalls": "Description of potential legal pitfalls",
  "suggestedImprovements": "Suggested improvements for the clause"
}`,
});

const assessClauseRiskFlow = ai.defineFlow(
  {
    name: 'assessClauseRiskFlow',
    inputSchema: ClauseRiskAssessmentInputSchema,
    outputSchema: ClauseRiskAssessmentOutputSchema,
  },
  async input => {
    const {output} = await assessClauseRiskPrompt(input);
    return output!;
  }
);
