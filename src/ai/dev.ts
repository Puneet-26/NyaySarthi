'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/clause-risk-assessment.ts';
import '@/ai/flows/layman-view-simplification.ts';
import '@/ai/flows/legal-chatbot.ts';
import '@/ai/flows/mind-map-generator.ts';
import '@/ai/flows/extract-text-from-file.ts';
import '@/ai/flows/get-recent-cases.ts';
import '@/ai/flows/search-cases-by-year.ts';

import '@/ai/flows/simplify-analysis.ts';
