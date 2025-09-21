'use server';

/**
 * @fileOverview A Genkit flow for fetching recent landmark court cases.
 * - getRecentCases: An async function to initiate the flow.
 */

import { ai } from '@/ai/genkit';
import {
  GetRecentCasesOutputSchema,
  type GetRecentCasesOutput,
} from '@/ai/schemas/recent-cases';

export async function getRecentCases(): Promise<GetRecentCasesOutput> {
  return getRecentCasesFlow();
}

const prompt = ai.definePrompt({
  name: 'getRecentCasesPrompt',
  output: { schema: GetRecentCasesOutputSchema },
  prompt: `You are a legal research assistant. Your task is to provide a list of 5 to 7 recent, landmark, and plausible (but fictional) court judgements from the Indian judicial system.

  These cases should seem like they were decided in the last month to simulate a weekly update.

  For each case, provide the following details:
  - title: The name of the case.
  - date: The date of the judgement in a readable format (e.g., 'Month Day, Year').
  - court: The court where the judgement was passed (e.g., 'Supreme Court of India', 'High Court of Delhi').
  - summary: A brief, clear summary of the case and its significance.
  - citation: A fictional legal citation for the case.

  Please generate a list of fictional judgements that are realistic and relevant to recent legal developments in India. Ensure the output is a valid JSON object.
  `,
});

const getRecentCasesFlow = ai.defineFlow(
  {
    name: 'getRecentCasesFlow',
    outputSchema: GetRecentCasesOutputSchema,
  },
  async () => {
    const { output } = await prompt();
    return output!;
  }
);
