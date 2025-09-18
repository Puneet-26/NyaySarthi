// @ts-nocheck
'use server';

import {
  assessClauseRisk,
  ClauseRiskAssessmentOutput,
} from '@/ai/flows/clause-risk-assessment';
import { askLegalChatbot } from '@/ai/flows/legal-chatbot';
import { simplifyLegalClause } from '@/ai/flows/layman-view-simplification';
import { ClauseAnalysis } from '@/lib/data';
import mammoth from 'mammoth';

async function extractTextFromDocx(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

export async function analyzeDocument(fileInfo: {
  fileContent: string;
  fileType: string;
}): Promise<{
  data?: ClauseAnalysis[];
  error?: string;
}> {
  try {
    let documentText = '';
    const { fileContent, fileType } = fileInfo;
    const base64Data = fileContent.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');

    if (
      fileType === 'application/msword' ||
      fileType ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      documentText = await extractTextFromDocx(buffer);
    } else {
      documentText = buffer.toString('utf-8');
    }

    if (!documentText) {
      return { error: 'Could not extract text from the document.' };
    }

    const clauses = documentText
      .split(/(?=Clause \d+\.|[0-9]+\.)/g)
      .map(s => s.trim())
      .filter(Boolean);

    if (clauses.length === 0) {
      return { error: 'No clauses found in the document. Ensure clauses are prefixed with "Clause X." or "X.".' };
    }

    const analysisPromises = clauses.map(async (clauseText, index) => {
      const result: ClauseRiskAssessmentOutput = await assessClauseRisk({
        clauseText,
      });
      return {
        clauseNumber: index + 1,
        clauseText,
        ...result,
      };
    });

    const results = await Promise.all(analysisPromises);
    return { data: results as ClauseAnalysis[] };
  } catch (e: any) {
    console.error('Analysis failed:', e);
    return { error: e.message || 'An unknown error occurred during analysis.' };
  }
}

export async function getLaymanView(
  clauseText: string
): Promise<{ data?: string; error?: string }> {
  try {
    const result = await simplifyLegalClause({ clause: clauseText });
    return { data: result.simplifiedExplanation };
  } catch (e: any) {
    console.error('Simplification failed:', e);
    return {
      error:
        e.message || 'An unknown error occurred during simplification.',
    };
  }
}

export async function getChatbotResponse(
  query: string
): Promise<{ data?: string; error?: string }> {
  try {
    const result = await askLegalChatbot({ query });
    return { data: result.response };
  } catch (e: any) {
    console.error('Chatbot failed:', e);
    return {
      error: e.message || 'An unknown error occurred during chat.',
    };
  }
}
