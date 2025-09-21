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

const landmarkCases = [
  {
    title: 'Kesavananda Bharati v. State of Kerala',
    date: 'April 24, 1973',
    court: 'Supreme Court of India',
    summary:
      'This case established the "Basic Structure Doctrine," which holds that Parliament cannot amend the Constitution in a way that alters its fundamental framework. It is a cornerstone of Indian constitutional law.',
    citation: 'AIR 1973 SC 1461',
  },
  {
    title: 'Maneka Gandhi v. Union of India',
    date: 'January 25, 1978',
    court: 'Supreme Court of India',
    summary:
      'The Court held that the "procedure established by law" under Article 21 must be fair, just, and reasonable, not arbitrary. It expanded the interpretation of the Right to Life and Personal Liberty.',
    citation: 'AIR 1978 SC 597',
  },
  {
    title: 'Vishakha v. State of Rajasthan',
    date: 'August 13, 1997',
    court: 'Supreme Court of India',
    summary:
      'In the absence of a law, the Supreme Court laid down guidelines to prevent sexual harassment of women at the workplace. These are known as the "Vishakha Guidelines" and led to the Sexual Harassment of Women at Workplace Act, 2013.',
    citation: 'AIR 1997 SC 3011',
  },
  {
    title: 'Shreya Singhal v. Union of India',
    date: 'March 24, 2015',
    court: 'Supreme Court of India',
    summary:
      'The Court struck down Section 66A of the Information Technology Act, 2000, which criminalized "offensive" online content, as being unconstitutional and a violation of the freedom of speech and expression.',
    citation: 'AIR 2015 SC 1523',
  },
  {
    title: 'K.S. Puttaswamy v. Union of India',
    date: 'August 24, 2017',
    court: 'Supreme Court of India',
    summary:
      'A nine-judge bench unanimously held that the Right to Privacy is a fundamental right protected under Articles 14, 19, and 21 of the Constitution of India. This judgment has wide-ranging implications for data protection and individual liberty.',
    citation: '(2017) 10 SCC 1',
  },
];

export default function LandmarkCasesPage() {
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
              Landmark Cases
            </h1>
            <p className="mt-2 text-muted-foreground">
              A collection of pivotal judgments from the Indian judicial system.
            </p>
          </div>
          <div className="mt-8 grid gap-6">
            {landmarkCases.map((caseItem, index) => (
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
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
