import {z} from 'genkit';

export const ClauseRiskAssessmentInputSchema = z.object({
  documentText: z
    .string()
    .describe('The full text of the legal document to be assessed.'),
});
export type ClauseRiskAssessmentInput = z.infer<
  typeof ClauseRiskAssessmentInputSchema
>;

export const ClauseRiskAssessmentSchema = z.object({
  clauseNumber: z
    .number()
    .optional()
    .describe('The clause number from the document, e.g., 1, 2.1, 5.'),
  clauseText: z.string().describe('The full text of the legal clause.'),
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
export type ClauseRiskAssessment = z.infer<typeof ClauseRiskAssessmentSchema>;

export const ClauseRiskAssessmentOutputSchema = z.object({
  clauses: z
    .array(ClauseRiskAssessmentSchema)
    .describe(
      'An array of all the clause risk assessments from the document.'
    ),
});
export type ClauseRiskAssessmentOutput = z.infer<
  typeof ClauseRiskAssessmentOutputSchema
>;
