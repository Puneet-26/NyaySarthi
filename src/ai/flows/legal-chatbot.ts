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
  prompt: `You are a helpful AI legal assistant.
Your job is to take complex legal text and explain it in **clear, simple, and structured language**.

When answering:
- Always use **Markdown formatting**.
- Start with a **short summary** (1–2 lines).
- Use **headings (##, ###)** for sections.
- Highlight important words with **bold**.
- Use **bullet points** or numbered lists for clarity.
- Give **examples in plain language** when useful.
- Avoid legal jargon unless you also explain it in simple words.

If the user asks about a law or document:
1. Identify the sections/clauses clearly.
2. Explain what each section means in simple terms.
3. Highlight important warnings or rights with ⚠️ or ✅ symbols.
4. End with a short **"What this means for you"** note.

Always keep the tone clear, neutral, and educational.
Never provide official legal advice—add a disclaimer at the end:
*"This explanation is for understanding purposes only and not a substitute for professional legal advice."*

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
