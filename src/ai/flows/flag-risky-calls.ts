// src/ai/flows/flag-risky-calls.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow to identify and flag risky calls based on their transcripts.
 *
 * - flagRiskyCalls - An async function that takes call transcript as input and returns a risk assessment.
 * - FlagRiskyCallsInput - The input type for the flagRiskyCalls function.
 * - FlagRiskyCallsOutput - The output type for the flagRiskyCalls function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FlagRiskyCallsInputSchema = z.object({
  transcript: z
    .string()
    .describe('The transcript of the call to be analyzed for risk factors.'),
});
export type FlagRiskyCallsInput = z.infer<typeof FlagRiskyCallsInputSchema>;

const FlagRiskyCallsOutputSchema = z.object({
  isRisky: z
    .boolean()
    .describe('Whether the call is flagged as risky based on the content of the transcript.'),
  riskFactors: z
    .array(z.string())
    .describe('A list of specific risk factors identified in the call transcript.'),
  summary: z
    .string()
    .describe('A brief summary of why the call was flagged as risky.'),
});
export type FlagRiskyCallsOutput = z.infer<typeof FlagRiskyCallsOutputSchema>;

export async function flagRiskyCalls(input: FlagRiskyCallsInput): Promise<FlagRiskyCallsOutput> {
  return flagRiskyCallsFlow(input);
}

const flagRiskyCallsPrompt = ai.definePrompt({
  name: 'flagRiskyCallsPrompt',
  input: {schema: FlagRiskyCallsInputSchema},
  output: {schema: FlagRiskyCallsOutputSchema},
  prompt: `You are an AI assistant specializing in identifying potential risk factors in hospital call transcripts.
  Your task is to analyze the given call transcript and determine if it contains any risk factors, such as mentions of legal issues, patient safety concerns, or other sensitive topics.

  Based on your analysis, indicate whether the call is risky (isRisky) and provide a list of specific risk factors identified (riskFactors).
  Also, provide a brief summary explaining why the call was flagged as risky (summary).

  Call Transcript: {{{transcript}}}`,
});

const flagRiskyCallsFlow = ai.defineFlow(
  {
    name: 'flagRiskyCallsFlow',
    inputSchema: FlagRiskyCallsInputSchema,
    outputSchema: FlagRiskyCallsOutputSchema,
  },
  async input => {
    const {output} = await flagRiskyCallsPrompt(input);
    return output!;
  }
);
