'use client';

import { useState, useTransition } from 'react';
import { analyzeDocument } from '@/app/actions';
import type { ClauseAnalysis } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2, PanelLeft, FileText, Bot } from 'lucide-react';
import { Logo } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import { ClauseCard } from '@/components/clause-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function Home() {
  const [analysisResults, setAnalysisResults] = useState<
    ClauseAnalysis[] | null
  >(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleAnalysis = () => {
    startTransition(async () => {
      const result = await analyzeDocument();
      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Analysis Failed',
          description: result.error,
        });
        setAnalysisResults(null);
      } else {
        setAnalysisResults(result.data || []);
      }
    });
  };

  const riskColorMap: Record<
    'High' | 'Medium' | 'Low',
    { base: string; hover: string; text: string }
  > = {
    High: {
      base: 'bg-risk-high/20 border-risk-high/50',
      hover: 'hover:bg-risk-high/30',
      text: 'text-risk-high',
    },
    Medium: {
      base: 'bg-risk-medium/20 border-risk-medium/50',
      hover: 'hover:bg-risk-medium/30',
      text: 'text-risk-medium',
    },
    Low: {
      base: 'bg-risk-low/20 border-risk-low/50',
      hover: 'hover:bg-risk-low/30',
      text: 'text-risk-low',
    },
  };

  const scrollToClause = (clauseNumber: number) => {
    document
      .getElementById(`clause-${clauseNumber}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <header className="flex h-16 items-center justify-between border-b px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Logo className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-2xl font-bold tracking-tight text-foreground">
            Legali
          </h1>
        </div>
        <ThemeToggle />
      </header>

      {analysisResults === null ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 p-4 text-center">
          <div className="rounded-full border bg-card p-4">
            <Bot size={48} className="text-primary" />
          </div>
          <h2 className="font-headline text-3xl font-semibold">
            Unlock AI-Powered Legal Insights
          </h2>
          <p className="max-w-xl text-muted-foreground">
            Upload your legal documents and let Legali break down complex
            clauses, assess risks, and provide easy-to-understand explanations.
          </p>
          <Button
            size="lg"
            onClick={handleAnalysis}
            disabled={isPending}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze Sample Document'
            )}
          </Button>
        </div>
      ) : (
        <div className="flex flex-1 overflow-hidden">
          <aside className="hidden w-72 flex-col border-r bg-card/50 lg:flex">
            <div className="flex h-14 items-center border-b px-4">
              <h2 className="font-headline text-lg font-semibold">
                Document Summary
              </h2>
            </div>
            <ScrollArea className="flex-1">
              <TooltipProvider>
                <nav className="grid gap-1 p-2">
                  {analysisResults.map(clause => (
                    <Tooltip key={clause.clauseNumber}>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            'justify-start gap-3 border border-transparent',
                            riskColorMap[clause.riskLevel].base,
                            riskColorMap[clause.riskLevel].hover
                          )}
                          onClick={() => scrollToClause(clause.clauseNumber)}
                        >
                          <span
                            className={cn(
                              'font-bold',
                              riskColorMap[clause.riskLevel].text
                            )}
                          >
                            {String(clause.clauseNumber).padStart(2, '0')}
                          </span>
                          <span className="truncate text-left text-sm text-muted-foreground">
                            {clause.clauseText}
                          </span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p className="max-w-xs">{clause.clauseText}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </nav>
              </TooltipProvider>
            </ScrollArea>
          </aside>
          <main className="flex-1 overflow-y-auto">
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="mb-6">
                <h1 className="font-headline text-3xl font-bold">
                  Clause Analysis
                </h1>
                <p className="text-muted-foreground">
                  Detailed breakdown of your document.
                </p>
              </div>
              <div className="grid gap-6">
                {isPending && analysisResults.length === 0 ? (
                  <div className="flex h-96 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  analysisResults.map(clause => (
                    <ClauseCard key={clause.clauseNumber} clause={clause} />
                  ))
                )}
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
