import { z } from 'genkit';

export const RecentCaseSchema = z.object({
  title: z.string().describe('The name of the case.'),
  date: z.string().describe("The date of the judgement, e.g., 'October 26, 2023'"),
  court: z.string().describe('The court where the judgement was passed.'),
  summary: z.string().describe('A brief summary of the case and its significance.'),
  citation: z.string().describe('The legal citation for the case.'),
});
export type RecentCase = z.infer<typeof RecentCaseSchema>;

export const GetRecentCasesOutputSchema = z.object({
  recentCases: z
    .array(RecentCaseSchema)
    .describe('A list of recent landmark cases.'),
});
export type GetRecentCasesOutput = z.infer<typeof GetRecentCasesOutputSchema>;
