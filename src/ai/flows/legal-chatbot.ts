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

  A user has a legal question. Please provide a clear, concise, and informative response to their query.

  User's question: {{query}}

  Remember to include a disclaimer that you are an AI assistant and not a substitute for a qualified legal professional.`,
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
