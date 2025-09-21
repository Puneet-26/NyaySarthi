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
  response: z.string().describe("The chatbot's answer to the legal question."),
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
  prompt: `You are a legal AI assistant.
Always respond in this structured format:

📖 Simplified Answer:
[Write a 3–4 sentence simple explanation here]

📌 Key Points:
- [Point 1]
- [Point 2]
- [Point 3]

✅ What this means for you:
- [Actionable advice or practical meaning in plain English]

Formatting rules:
- Use bullet points for lists.
- Keep sentences short and simple.
- Avoid legal jargon.
- Do NOT provide legal advice beyond simplification.

Here is the user's question:
"{{query}}"
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
