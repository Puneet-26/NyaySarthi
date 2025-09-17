export type ClauseAnalysis = {
  clauseNumber: number;
  clauseText: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  ambiguities: string;
  missingTerms: string;
  legalPitfalls: string;
  suggestedImprovements: string;
};
