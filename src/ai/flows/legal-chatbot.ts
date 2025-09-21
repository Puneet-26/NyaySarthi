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

  Your response should be structured, informative, and easy to read. Use markdown for formatting, including headings, subheadings, bullet points, and bold text where appropriate to improve clarity.
  
  Start your response with a brief summary acknowledging the user's query.

  For example, if the user asks "dowry act all sections", your response could look like:
  
  You're asking about the **Dowry Prohibition Act, 1961 (India)** and its sections. Here's a structured list of all the sections under the Act (with short explanations for clarity):

  ### 📜 Dowry Prohibition Act, 1961 – Sections

  ---

  #### Chapter I – Preliminary
  *   **Section 1:** Short title, extent and commencement.
  *   **Section 2:** Definition of "dowry".

  #### Chapter II – Penalty Provisions
  *   **Section 3:** Penalty for giving or taking dowry.
  *   **Section 4:** Penalty for demanding dowry.
  
  Finally, end your entire response with the following disclaimer on its own new line, separated by a horizontal rule:
  
  ---
  *Disclaimer: I am an AI assistant and this is not legal advice. Please consult a qualified legal professional for any legal concerns.*
  `,
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
