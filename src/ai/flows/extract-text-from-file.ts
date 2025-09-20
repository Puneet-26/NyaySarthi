'use server';

/**
 * @fileOverview A Genkit flow for extracting text from a file.
 *
 * - extractTextFromFile: An async function to initiate the text extraction flow.
 * - ExtractTextFromFileInput: The input type for the extractTextFromFile function.
 * - ExtractTextFromFileOutput: The output type for the extractTextFromFile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractTextFromFileInputSchema = z.object({
  fileDataUri: z
    .string()
    .describe(
      "The file content as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractTextFromFileInput = z.infer<typeof ExtractTextFromFileInputSchema>;

const ExtractTextFromFileOutputSchema = z.object({
  extractedText: z.string().describe('The extracted text from the file.'),
});
export type ExtractTextFromFileOutput = z.infer<typeof ExtractTextFromFileOutputSchema>;

export async function extractTextFromFile(
  input: ExtractTextFromFileInput
): Promise<ExtractTextFromFileOutput> {
  return extractTextFromFileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractTextFromFilePrompt',
  input: {schema: ExtractTextFromFileInputSchema},
  output: {schema: ExtractTextFromFileOutputSchema},
  prompt: `Extract the text content from the following file.

File: {{media url=fileDataUri}}`,
});

const extractTextFromFileFlow = ai.defineFlow(
  {
    name: 'extractTextFromFileFlow',
    inputSchema: ExtractTextFromFileInputSchema,
    outputSchema: ExtractTextFromFileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
