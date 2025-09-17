'use client';

import { useState, useTransition } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getLaymanView } from '@/app/actions';
import type { ClauseAnalysis } from '@/lib/data';
import { cn } from '@/lib/utils';
import { AlertCircle, FileWarning, ShieldCheck, ThumbsUp, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ClauseCard({ clause }: { clause: ClauseAnalysis }) {
  const [laymanView, setLaymanView] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const riskStyles = {
    High: {
      badge: 'bg-risk-high text-white',
      border: 'border-risk-high',
      icon: <AlertCircle className="h-5 w-5 text-risk-high" />,
    },
    Medium: {
      badge: 'bg-risk-medium text-white',
      border: 'border-risk-medium',
      icon: <FileWarning className="h-5 w-5 text-risk-medium" />,
    },
    Low: {
      badge: 'bg-risk-low text-white',
      border: 'border-risk-low',
      icon: <ShieldCheck className="h-5 w-5 text-risk-low" />,
    },
  };

  const handleTabChange = (value: string) => {
    if (value === 'layman' && !laymanView) {
      startTransition(async () => {
        const result = await getLaymanView(clause.clauseText);
        if (result.error) {
          toast({
            variant: 'destructive',
            title: 'Failed to get layman view',
            description: result.error,
          });
          setLaymanView('Could not load simplified explanation.');
        } else {
          setLaymanView(result.data || 'No explanation available.');
        }
      });
    }
  };

  return (
    <Card
      id={`clause-${clause.clauseNumber}`}
      className={cn(
        'overflow-hidden border-l-4 transition-shadow hover:shadow-lg',
        riskStyles[clause.riskLevel].border
      )}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="font-headline text-xl">
              Clause {clause.clauseNumber}
            </CardTitle>
            <CardDescription className="mt-1">
              {clause.clauseText}
            </CardDescription>
          </div>
          <Badge
            className={cn(
              'whitespace-nowrap px-3 py-1 text-sm',
              riskStyles[clause.riskLevel].badge
            )}
          >
            {clause.riskLevel} Risk
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="lawyer" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lawyer">Lawyer View</TabsTrigger>
            <TabsTrigger value="layman">Layman View</TabsTrigger>
          </TabsList>
          <TabsContent value="lawyer" className="mt-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="ambiguities">
                <AccordionTrigger>Ambiguities</AccordionTrigger>
                <AccordionContent>{clause.ambiguities}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="missing-terms">
                <AccordionTrigger>Missing Terms</AccordionTrigger>
                <AccordionContent>{clause.missingTerms}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="legal-pitfalls">
                <AccordionTrigger>Potential Legal Pitfalls</AccordionTrigger>
                <AccordionContent>{clause.legalPitfalls}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="improvements">
                <AccordionTrigger className="text-green-500 hover:text-green-600">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    Suggested Improvements
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80">
                  {clause.suggestedImprovements}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          <TabsContent value="layman" className="mt-4">
            {isPending ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : (
              <div className="prose prose-sm dark:prose-invert max-w-none rounded-md bg-muted/50 p-4">
                <p>{laymanView}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
