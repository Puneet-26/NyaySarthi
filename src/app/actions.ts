// @ts-nocheck
'use server';

import {
  assessClauseRisk,
  ClauseRiskAssessmentOutput,
} from '@/ai/flows/clause-risk-assessment';
import { simplifyLegalClause } from '@/ai/flows/layman-view-simplification';
import { sampleLegalDocument, ClauseAnalysis } from '@/lib/data';

export async function analyzeDocument(): Promise<{
  data?: ClauseAnalysis[];
  error?: string;
}> {
  try {
    const clauses = sampleLegalDocument
      .split(/(?=Clause \d+\.)/g)
      .map(s => s.trim())
      .filter(Boolean);

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
