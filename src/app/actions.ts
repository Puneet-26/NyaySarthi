'use server';

import { assessClauseRisk } from '@/ai/flows/clause-risk-assessment';
import { type ClauseRiskAssessment } from '@/ai/schemas/clause-risk-assessment';
import { askLegalChatbot } from '@/ai/flows/legal-chatbot';
import { simplifyLegalClause } from '@/ai/flows/layman-view-simplification';
import { generateMindMap, MindMapNode } from '@/ai/flows/mind-map-generator';
import { extractTextFromFile } from '@/ai/flows/extract-text-from-file';
import { ClauseAnalysis } from '@/lib/data';
import mammoth from 'mammoth';
import { simplifyAnalysis, type SimplifyAnalysisOutput } from '@/ai/flows/simplify-analysis';
import { getRecentCases } from '@/ai/flows/get-recent-cases';
import { type RecentCase } from '@/ai/schemas/recent-cases';
import { searchCasesByYear } from '@/ai/flows/search-cases-by-year';


async function extractTextFromDocx(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

export async function analyzeDocument(fileInfo: {
  fileContent: string;
  fileType: string;
}): Promise<{
  text?: string;
  clauses?: ClauseAnalysis[];
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
    } else if (fileType === 'application/pdf') {
      const result = await extractTextFromFile({ fileDataUri: fileContent });
      documentText = result.extractedText;
    } else {
      documentText = buffer.toString('utf-8');
    }

    if (!documentText) {
      return { error: 'Could not extract text from the document.' };
    }

    const assessmentResult = await assessClauseRisk({ documentText });

    if (!assessmentResult.clauses || assessmentResult.clauses.length === 0) {
      return {
        text: documentText,
        clauses: [],
        error:
          'No clauses were found or analyzed in the document. Ensure the document is well-formatted.',
      };
    }
    
    // The AI might not return clause numbers, so we'll add them.
    const clausesWithNumbers: ClauseAnalysis[] = assessmentResult.clauses.map((clause, index) => ({
      ...clause,
      clauseNumber: clause.clauseNumber || index + 1,
    }));

    return { text: documentText, clauses: clausesWithNumbers };

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
): Promise<{ data?: string; error?:string }> {
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

export async function getMindMap(
  documentText: string
): Promise<{ data?: MindMapNode; error?: string }> {
  try {
    const result = await generateMindMap({ documentText });
    return { data: result.mindMap };
  } catch (e: any) {
    console.error('Mind map generation failed:', e);
    return {
      error:
        e.message || 'An unknown error occurred during mind map generation.',
    };
  }
}

export async function getSimplifiedAnalysis(
  analysis: ClauseAnalysis[]
): Promise<{ data?: SimplifyAnalysisOutput; error?: string }> {
  try {
    const result = await simplifyAnalysis({ analysis: JSON.stringify(analysis) });
    return { data: result };
  } catch (e: any) {
    console.error('Simplification failed:', e);
    return {
      error:
        e.message || 'An unknown error occurred during simplification.',
    };
  }
}

export async function getRecentCasesAction(): Promise<{ data?: RecentCase[]; error?: string; }> {
  try {
    const result = await getRecentCases();
    return { data: result.recentCases };
  } catch (e: any) {
    console.error('Failed to get recent cases:', e);
    return {
      error: e.message || 'An unknown error occurred while fetching recent cases.',
    };
  }
}

export async function searchCasesByYearAction(year: number): Promise<{ data?: RecentCase[]; error?: string; }> {
  try {
    const result = await searchCasesByYear({ year });
    return { data: result.cases };
  } catch (e: any) {
    console.error(`Failed to get cases for year ${year}:`, e);
    return {
      error: e.message || `An unknown error occurred while fetching cases for ${year}.`,
    };
  }
}
