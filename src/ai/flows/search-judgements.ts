'use server';

/**
 * @fileOverview A Genkit flow for searching court judgements.
 *
 * - searchJudgements: An async function to initiate the judgement search flow.
 */

import {ai} from '@/ai/genkit';
import {
  SearchJudgementsInputSchema,
  SearchJudgementsOutputSchema,
  type SearchJudgementsInput,
  type SearchJudgementsOutput,
} from '@/ai/schemas/search-judgements';

export async function searchJudgements(
  input: SearchJudgementsInput
): Promise<SearchJudgementsOutput> {
  return searchJudgementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'searchJudgementsPrompt',
  input: {schema: SearchJudgementsInputSchema},
  output: {schema: SearchJudgementsOutputSchema},
  prompt: `You are a legal research assistant. Your task is to search for court judgements based on the provided criteria.
  
  Since you do not have access to a live legal database, you will generate realistic but fictional search results.
  
  Search for judgements matching the following criteria and return up to 10 results:
  
  {{#if court}}Court: {{court}}{{/if}}
  {{#if judges}}Judges: {{judges}}{{/if}}
  {{#if parties}}Parties: {{parties}}{{/if}}
  {{#if dateFrom}}From: {{dateFrom}}{{/if}}
  {{#if dateTo}}To: {{dateTo}}{{/if}}

  Please generate a list of fictional judgements that plausibly match the query. Ensure the output is a valid JSON object.
  `,
});

const searchJudgementsFlow = ai.defineFlow(
  {
    name: 'searchJudgementsFlow',
    inputSchema: SearchJudgementsInputSchema,
    outputSchema: SearchJudgementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
