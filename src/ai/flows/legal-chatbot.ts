'use server';

/**
 * @fileOverview A legal chatbot AI agent.
 *
 * - askLegalChatbot - A function that answers legal questions.
 * - LegalChatbotInput - The input type for the askLegalChatbot function.
 * - LegalChatbotOutput - The return type for the askLegalChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LegalChatbotInputSchema = z.object({
  query: z.string().describe('The legal question to ask the chatbot.'),
});
export type LegalChatbotInput = z.infer<typeof LegalChatbotInputSchema>;

const LegalChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot\'s answer to the legal question.'),
});
export type LegalChatbotOutput = z.infer<typeof LegalChatbotOutputSchema>;

export async function askLegalChatbot(
  input: LegalChatbotInput
): Promise<LegalChatbotOutput> {
  return legalChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'legalChatbotPrompt',
  input: {schema: LegalChatbotInputSchema},
  output: {schema: LegalChatbotOutputSchema},
  prompt: `You are a helpful and knowledgeable legal assistant AI. You are not a lawyer and cannot provide legal advice, so you must always include a disclaimer to that effect.

  A user has the following legal question:
  "{{query}}"

  Provide a clear, concise, and informative response.

  End your response with the following disclaimer on a new line:
  "Disclaimer: I am an AI assistant and this is not legal advice. Please consult a qualified legal professional for any legal concerns."`,
});

const legalChatbotFlow = ai.defineFlow(
  {
    name: 'legalChatbotFlow',
    inputSchema: LegalChatbotInputSchema,
    outputSchema: LegalChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
