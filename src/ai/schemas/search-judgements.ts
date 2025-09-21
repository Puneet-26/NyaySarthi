import {z} from 'genkit';

export const SearchJudgementsInputSchema = z.object({
  court: z.string().optional().describe('The name of the court.'),
  judges: z
    .string()
    .optional()
    .describe('The names of the presiding judges, comma-separated.'),
  parties: z.string().optional().describe('The names of the parties involved.'),
  dateFrom: z
    .string()
    .optional()
    .describe('The start date of the search range in ISO 8601 format.'),
  dateTo: z
    .string()
    .optional()
    .describe('The end date of the search range in ISO 8601 format.'),
});
export type SearchJudgementsInput = z.infer<
  typeof SearchJudgementsInputSchema
>;

const JudgementSchema = z.object({
  caseName: z.string().describe('The name of the case.'),
  court: z.string().describe('The court where the judgement was passed.'),
  judges: z.array(z.string()).describe('The names of the judges.'),
  date: z.string().describe('The date of the judgement in YYYY-MM-DD format.'),
});
export type Judgement = z.infer<typeof JudgementSchema>;

export const SearchJudgementsOutputSchema = z.object({
  judgements: z
    .array(JudgementSchema)
    .describe('A list of judgements matching the search criteria.'),
});
export type SearchJudgementsOutput = z.infer<
  typeof SearchJudgementsOutputSchema
>;
