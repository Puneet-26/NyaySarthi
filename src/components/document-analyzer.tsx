'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { analyzeDocument } from '@/app/actions';
import { ClauseAnalysis } from '@/lib/data';
import { ClauseCard } from '@/components/clause-card';
import { UploadCloud, File, Loader2, AlertTriangle, BarChart, List, Share2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { MindMapView } from './mind-map-view';

type AnalysisResult = {
  text?: string;
  clauses?: ClauseAnalysis[];
  error?: string;
};

export function DocumentAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, startTransition] = useTransition();
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAnalysisResult(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
      setAnalysisResult(null);
    }
  };

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please select a document to analyze.',
      });
      return;
    }

    setAnalysisResult(null);
    setProgress(0);

    startTransition(async () => {
      try {
        const fileContent = await readFileAsDataURL(file);

        // Simulate progress for user feedback
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 95) {
              clearInterval(progressInterval);
              return prev;
            }
            return prev + 5;
          });
        }, 300);

        const result = await analyzeDocument({
          fileContent,
          fileType: file.type,
        });
        clearInterval(progressInterval);
        setProgress(100);

        if (result.error && !result.clauses) {
          toast({
            variant: 'destructive',
            title: 'Analysis Failed',
            description: result.error,
          });
        }
        setAnalysisResult(result);
      } catch (e: any) {
        setAnalysisResult({
          error: 'Failed to read or analyze the document.',
        });
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'An unexpected error occurred.',
        });
      }
    });
  };

  const riskCounts =
    analysisResult?.clauses?.reduce(
      (acc, clause) => {
        acc[clause.riskLevel] = (acc[clause.riskLevel] || 0) + 1;
        return acc;
      },
      {} as Record<'High' | 'Medium' | 'Low', number>
    ) || { High: 0, Medium: 0, Low: 0 };

  return (
    <div className="flex h-full flex-col">
      <div className="p-4 sm:p-6 lg:p-8">
        <header className="mb-6">
          <h1 className="font-headline text-3xl font-bold">
            Document Analysis
          </h1>
          <p className="text-muted-foreground">
            Upload a legal document to analyze its clauses for risks and get
            suggested improvements.
          </p>
        </header>

        <Card>
          <CardContent className="p-6">
            <div className="grid gap-6">
              <label
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 py-12 text-center transition-colors hover:bg-muted"
              >
                <UploadCloud className="mb-4 h-10 w-10 text-muted-foreground" />
                <p className="mb-2 font-semibold text-foreground">
                  Drag & drop your document here
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to select a file
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Supported formats: .pdf, .txt, .md, .docx
                </p>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  accept=".pdf,.txt,.md,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
                />
              </label>
              {file && (
                <div className="flex items-center justify-between rounded-lg border bg-card p-3">
                  <div className="flex items-center gap-3">
                    <File className="h-6 w-6 text-primary" />
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <Button onClick={handleAnalyze} disabled={isAnalyzing}>
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      'Analyze Document'
                    )}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {isAnalyzing && (
          <div className="mt-6 space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-center text-muted-foreground">
              AI is analyzing your document, this may take a moment...
            </p>
          </div>
        )}

        {analysisResult && (
          <div className="mt-8">
            {analysisResult.error && !analysisResult.clauses?.length ? (
              <Card className="border-destructive bg-destructive/10">
                <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                  <AlertTriangle className="h-10 w-10 text-destructive" />
                  <h3 className="font-headline text-xl font-semibold">
                    Analysis Failed
                  </h3>
                  <p className="text-destructive">{analysisResult.error}</p>
                </CardContent>
              </Card>
            ) : (
               <Tabs defaultValue="analysis">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="analysis">Risk Analysis</TabsTrigger>
                  <TabsTrigger value="mindmap">Mind Map</TabsTrigger>
                </TabsList>
                 <TabsContent value="analysis" className="mt-6">
                   {analysisResult.clauses && analysisResult.clauses.length > 0 ? (
                    <>
                      <Card className="mb-6">
                        <CardContent className="p-6">
                          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                            <div className="flex items-center gap-4">
                              <BarChart className="h-8 w-8 text-primary" />
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Total Clauses
                                </p>
                                <p className="text-2xl font-bold">
                                  {analysisResult.clauses.length}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="rounded-full bg-risk-high/20 p-2">
                                <AlertTriangle className="h-6 w-6 text-risk-high" />
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  High Risk
                                </p>
                                <p className="text-2xl font-bold">
                                  {riskCounts.High || 0}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="rounded-full bg-risk-medium/20 p-2">
                                <List className="h-6 w-6 text-risk-medium" />
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Medium Risk
                                </p>
                                <p className="text-2xl font-bold">
                                  {riskCounts.Medium || 0}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="rounded-full bg-risk-low/20 p-2">
                                <List className="h-6 w-6 text-risk-low" />
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Low Risk
                                </p>
                                <p className="text-2xl font-bold">
                                  {riskCounts.Low || 0}
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <div className="space-y-4">
                        {analysisResult.clauses.map(clause => (
                          <ClauseCard
                            key={clause.clauseNumber}
                            clause={clause}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <Card>
                       <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                        <AlertTriangle className="h-10 w-10 text-destructive" />
                        <h3 className="font-headline text-xl font-semibold">No Clauses Found</h3>
                        <p className="text-muted-foreground">{analysisResult.error}</p>
                       </CardContent>
                    </Card>
                  )}
                 </TabsContent>
                 <TabsContent value="mindmap" className="mt-6">
                  {analysisResult.text ? (
                    <MindMapView documentText={analysisResult.text} />
                  ) : (
                    <p>Could not load mind map view.</p>
                  )}
                 </TabsContent>
               </Tabs>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
