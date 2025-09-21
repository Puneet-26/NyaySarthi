'use client';

import { Logo } from '@/components/icons';
import { MainMenu } from '@/components/main-menu';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { getRecentCasesAction } from '../actions';
import { useEffect, useState } from 'react';
import { RecentCase } from '@/ai/schemas/recent-cases';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

function LandmarkCasesPage() {
  const [cases, setCases] = useState<RecentCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCases() {
      setLoading(true);
      setError(null);
      const result = await getRecentCasesAction();
      if (result.error) {
        setError(result.error);
      } else {
        setCases(result.data || []);
      }
      setLoading(false);
    }
    fetchCases();
  }, []);

  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <header className="flex h-16 items-center justify-between border-b px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-4">
          <Logo className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-2xl font-bold tracking-tight text-foreground">
            NyaySetu
          </h1>
        </Link>
        <MainMenu />
      </header>
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="font-headline text-4xl font-bold">
              Recent Landmark Cases
            </h1>
            <p className="mt-2 text-muted-foreground">
              A collection of pivotal judgments from the Indian judicial system,
              updated weekly.
            </p>
          </div>

          <div className="mt-8 grid gap-6">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <Card key={index}>
                  <CardHeader>
                    <Skeleton className="h-7 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-6 w-1/4" />
                  </CardFooter>
                </Card>
              ))
            ) : error ? (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Could not load recent cases. Please try again later.
                </AlertDescription>
              </Alert>
            ) : (
              cases.map((caseItem, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">
                      {caseItem.title}
                    </CardTitle>
                    <CardDescription>
                      {caseItem.court} - {caseItem.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{caseItem.summary}</p>
                  </CardContent>
                  <CardFooter>
                    <Badge variant="secondary">{caseItem.citation}</Badge>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandmarkCasesPage;
