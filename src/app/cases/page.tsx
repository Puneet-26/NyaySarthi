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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { getRecentCasesAction, searchCasesByYearAction } from '../actions';
import { useEffect, useState } from 'react';
import { RecentCase } from '@/ai/schemas/recent-cases';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

function LandmarkCasesPage() {
  const [cases, setCases] = useState<RecentCase[]>([]);
  const [loadingCases, setLoadingCases] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>('recent');

  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      async function fetchCases() {
        setLoadingCases(true);
        setError(null);
        let result;
        if (selectedYear === 'recent') {
          result = await getRecentCasesAction();
        } else {
          result = await searchCasesByYearAction(parseInt(selectedYear));
        }

        if (result.error) {
          setError(result.error);
          setCases([]);
        } else {
          setCases(result.data || []);
        }
        setLoadingCases(false);
      }
      fetchCases();
    }
  }, [selectedYear, user]);

  if (authLoading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <header className="flex h-16 items-center justify-between border-b px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-4">
          <Logo className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-2xl font-bold tracking-tight text-foreground">
            NyaySarthi
          </h1>
        </Link>
        <MainMenu />
      </header>
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="font-headline text-4xl font-bold">
              Landmark Cases
            </h1>
            <p className="mt-2 text-muted-foreground">
              A collection of pivotal judgments from the Indian judicial system.
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="w-full max-w-xs space-y-2">
              <Label htmlFor="year-select">Select Year</Label>
              <Select
                value={selectedYear}
                onValueChange={setSelectedYear}
              >
                <SelectTrigger id="year-select">
                  <SelectValue placeholder="Select a year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recent Cases</SelectItem>
                  {years.map(year => (
                    <SelectItem key={year} value={String(year)}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>


          <div className="mt-8 grid gap-6">
            {loadingCases ? (
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
                  Could not load cases for the selected year. Please try again later.
                </AlertDescription>
              </Alert>
            ) : cases.length > 0 ? (
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
            ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No cases found for the selected year.</p>
                  </CardContent>
                </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandmarkCasesPage;
