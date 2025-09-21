'use server';

/**
 * @fileOverview A Genkit flow for fetching landmark court cases for a specific year.
 * - searchCasesByYear: An async function to initiate the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { RecentCaseSchema } from '@/ai/schemas/recent-cases';

const SearchCasesByYearInputSchema = z.object({
  year: z.number().describe('The year to search for landmark cases.'),
});
type SearchCasesByYearInput = z.infer<typeof SearchCasesByYearInputSchema>;

const SearchCasesByYearOutputSchema = z.object({
    cases: z.array(RecentCaseSchema).describe('A list of landmark cases for the specified year.')
});
type SearchCasesByYearOutput = z.infer<typeof SearchCasesByYearOutputSchema>;


export async function searchCasesByYear(input: SearchCasesByYearInput): Promise<SearchCasesByYearOutput> {
  return searchCasesByYearFlow(input);
}

const prompt = ai.definePrompt({
  name: 'searchCasesByYearPrompt',
  input: { schema: SearchCasesByYearInputSchema },
  output: { schema: SearchCasesByYearOutputSchema },
  prompt: `You are a legal research assistant. Your task is to provide a list of 5 to 7 landmark and plausible (but fictional) court judgements from the Indian judicial system for a specific year.

  Generate cases for the year: {{year}}.

  For each case, provide the following details:
  - title: The name of the case.
  - date: The date of the judgement in a readable format (e.g., 'Month Day, {{year}}').
  - court: The court where the judgement was passed (e.g., 'Supreme Court of India', 'High Court of Delhi').
  - summary: A brief, clear summary of the case and its significance.
  - citation: A fictional legal citation for the case.

  Please generate a list of fictional judgements that are realistic and relevant to legal developments in India for that year. Ensure the output is a valid JSON object.
  `,
});

const searchCasesByYearFlow = ai.defineFlow(
  {
    name: 'searchCasesByYearFlow',
    inputSchema: SearchCasesByYearInputSchema,
    outputSchema: SearchCasesByYearOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
