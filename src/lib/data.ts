export type ClauseAnalysis = {
  clauseNumber: number;
  clauseText: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  ambiguities: string;
  missingTerms: string;
  legalPitfalls: string;
  suggestedImprovements: string;
};

export const sampleLegalDocument = `
Clause 1. Confidentiality. Each party (the "Receiving Party") agrees that it shall not disclose to any third party any information concerning the business, affairs, or operations of the other party (the "Disclosing Party") that is not publicly known. This obligation shall survive the termination of this Agreement for a period of five years.

Clause 2. Term and Termination. This Agreement shall commence on the Effective Date and shall continue for a period of one (1) year, unless terminated earlier. Either party may terminate this agreement for any reason.

Clause 3. Limitation of Liability. In no event shall either party be liable for any indirect, incidental, special, or consequential damages, including but not limited to loss of profits, data, or use, incurred by either party or any third party, whether in an action in contract or tort, even if the other party or any other person has been advised of the possibility of such damages. The total liability shall not exceed the amount paid under this agreement.

Clause 4. Governing Law. This Agreement shall be governed by and construed in accordance with the laws of the state of California, without regard to its conflict of law principles. Any legal action or proceeding arising under this Agreement will be brought exclusively in the federal or state courts located in the Northern District of California.

Clause 5. Force Majeure. Neither party shall be liable for any failure to perform its obligations hereunder where such failure results from any cause beyond its reasonable control, including, without limitation, mechanical, electronic, or communications failure or degradation. A party's failure to perform must be excused.

Clause 6. Intellectual Property. All intellectual property developed during the term of this agreement will be owned by the service provider. The client receives a limited license to use the final deliverables.

Clause 7. Payment Terms. Invoices are due upon receipt. Late payments will incur a penalty of 1.5% per month. The client must pay all invoices in full, without offset or deduction.

Clause 8. Non-Solicitation. During the term of this Agreement and for one (1) year thereafter, the Client agrees not to solicit for employment any employee or contractor of the Service Provider. This clause is very restrictive.
`;
