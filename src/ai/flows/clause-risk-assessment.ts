'use server';

/**
 * @fileOverview This file defines a Genkit flow for assessing the risk level of clauses in a legal document.
 *
 * It includes:
 * - `assessClauseRisk`: An async function to initiate the clause risk assessment flow.
 */

import {ai} from '@/ai/genkit';
import {
  ClauseRiskAssessmentInputSchema,
  ClauseRiskAssessmentOutputSchema,
  type ClauseRiskAssessmentInput,
  type ClauseRiskAssessmentOutput,
} from '@/ai/schemas/clause-risk-assessment';

export async function assessClauseRisk(
  input: ClauseRiskAssessmentInput
): Promise<ClauseRiskAssessmentOutput> {
  return assessClauseRiskFlow(input);
}

const assessClauseRiskPrompt = ai.definePrompt({
  name: 'assessClauseRiskPrompt',
  input: {schema: ClauseRiskAssessmentInputSchema},
  output: {schema: ClauseRiskAssessmentOutputSchema},
  prompt: `You are an expert legal analyst specializing in risk assessment for legal documents.

You will receive the full text of a legal document. Your task is to identify each clause, analyze it, and provide a comprehensive risk assessment for every clause found.

First, segment the document into individual clauses. Clauses are typically denoted by numbers (e.g., 1., 2.1, Clause 3) or distinct paragraphs that represent a single provision.

For each clause, you must perform the following analysis and structure it as an object:
1.  **clauseNumber**: The number of the clause, if present.
2.  **clauseText**: The complete text of the clause.
3.  **riskLevel**: Assess the risk as 'High', 'Medium', or 'Low'.
4.  **ambiguities**: Describe any unclear language or ambiguities.
5.  **missingTerms**: Identify any critical terms or conditions that are missing.
6.  **legalPitfalls**: Highlight potential legal issues or pitfalls.
7.  **suggestedImprovements**: Provide concrete suggestions for improving the clause to mitigate risks.

Compile the analysis for all clauses into a single JSON object with a "clauses" array.

Document Text:
{{{documentText}}}
`,
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
