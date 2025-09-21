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
  prompt: `You are a helpful and knowledgeable legal assistant AI. You are not a lawyer and cannot provide legal advice.

  A user has asked the following legal question:
  "{{query}}"

  Your response MUST follow this format exactly:
  1.  Restate the user's question.
  2.  Provide a clear, concise, and informative answer on a new line.
  3.  End your entire response with the following disclaimer on its own new line: "Disclaimer: I am an AI assistant and this is not legal advice. Please consult a qualified legal professional for any legal concerns."

  For example:
  User's Question: "What is a contract?"

  A contract is a legally enforceable agreement between two or more parties that creates, defines, and governs mutual rights and obligations.

  Disclaimer: I am an AI assistant and this is not legal advice. Please consult a qualified legal professional for any legal concerns.`,
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
