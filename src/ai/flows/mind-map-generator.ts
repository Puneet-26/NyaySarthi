'use server';

/**
 * @fileOverview A Genkit flow for generating a mind map from a legal document.
 *
 * - generateMindMap: An async function to initiate the mind map generation flow.
 * - GenerateMindMapInput: The input type for the generateMindMap function.
 * - GenerateMindMapOutput: The output type for the generateMindMap function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMindMapInputSchema = z.object({
  documentText: z
    .string()
    .describe('The full text of the legal document.'),
});
export type GenerateMindMapInput = z.infer<typeof GenerateMindMapInputSchema>;

const MindMapNodeSchema: z.ZodType<MindMapNode> = z.lazy(() => z.object({
  topic: z.string().describe('The main topic of this node.'),
  summary: z.string().describe('A brief summary of the topic.'),
  children: z.array(MindMapNodeSchema).optional().describe('An array of child nodes.'),
}));

export type MindMapNode = {
  topic: string;
  summary: string;
  children?: MindMapNode[];
};

const GenerateMindMapOutputSchema = z.object({
  mindMap: MindMapNodeSchema,
});
export type GenerateMindMapOutput = z.infer<typeof GenerateMindMapOutputSchema>;


export async function generateMindMap(input: GenerateMindMapInput): Promise<GenerateMindMapOutput> {
  return generateMindMapFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMindMapPrompt',
  input: {schema: GenerateMindMapInputSchema},
  output: {schema: GenerateMindMapOutputSchema},
  prompt: `You are an expert legal analyst who excels at structuring complex information.

  Your task is to create a hierarchical mind map of the provided legal document. The mind map should break down the document into its core components, such as main sections, key articles, definitions, obligations, rights, and important clauses.

  Analyze the following document text and generate a mind map. The root node should be the document title or main subject. Each node must have a 'topic', a 'summary', and an array of 'children' nodes. If a node has no children, the 'children' property can be omitted.

  Document Text:
  {{{documentText}}}

  Please structure your output as a JSON object that follows the specified schema for the mind map.`,
});

const generateMindMapFlow = ai.defineFlow(
  {
    name: 'generateMindMapFlow',
    inputSchema: GenerateMindMapInputSchema,
    outputSchema: GenerateMindMapOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
