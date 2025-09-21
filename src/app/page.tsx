
'use client';

import Link from 'next/link';
import { Logo } from '@/components/icons';
import { MainMenu } from '@/components/main-menu';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart, Clock, ShieldCheck, FileText, UploadCloud, Cpu } from 'lucide-react';
import Image from 'next/image';
import { ContactUs } from '@/components/contact-us';

const highlights = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: '95% Accuracy Rate',
    description: 'Our AI delivers highly accurate legal analysis.',
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: 'Fast Processing',
    description: 'Analyze documents in minutes, not hours.',
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: 'Comprehensive Insights',
    description: 'Get clause-by-clause breakdowns and risk assessments.',
  },
];

const howItWorks = [
  {
    icon: <UploadCloud className="h-10 w-10 text-primary" />,
    step: 'Step 1: Upload',
    description: 'Securely upload your legal document in formats like PDF, DOCX, or TXT.'
  },
  {
    icon: <Cpu className="h-10 w-10 text-primary" />,
    step: 'Step 2: Analyze',
    description: 'Our AI analyzes the document, identifying clauses, risks, and ambiguities.'
  },
    {
    icon: <FileText className="h-10 w-10 text-primary" />,
    step: 'Step 3: Understand',
    description: 'Receive a simplified summary, risk report, and actionable insights.'
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="flex h-16 items-center justify-between border-b px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-4">
          <Logo className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-2xl font-bold tracking-tight text-foreground">
            NyaySetu
          </h1>
        </Link>
        <MainMenu />
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex h-[60vh] w-full items-center justify-center bg-primary">
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground">
            <h1 className="font-headline text-5xl font-bold md:text-7xl">
              AI-Powered Legal Analysis
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">
              Understand complex legal documents with ease. NyaySetu analyzes,
              simplifies, and provides actionable insights.
            </p>
            <Button asChild className="mt-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90" size="lg">
              <Link href="/dashboard">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="bg-muted py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              {highlights.map((highlight, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    {highlight.icon}
                  </div>
                  <h3 className="font-headline text-xl font-bold">
                    {highlight.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 sm:py-20">
           <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="font-headline text-4xl font-bold">How It Works</h2>
              <p className="mt-2 text-muted-foreground">
                Get clarity on your legal documents in three simple steps.
              </p>
            </div>
             <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
               {howItWorks.map((step, index) => (
                  <div key={index} className="rounded-lg border bg-card p-6 text-center shadow-sm">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      {step.icon}
                    </div>
                    <h3 className="font-headline text-2xl font-semibold">{step.step}</h3>
                    <p className="mt-2 text-muted-foreground">{step.description}</p>
                  </div>
               ))}
             </div>
          </div>
        </section>


        {/* Why Choose Us Section */}
        <section className="bg-muted py-16 sm:py-20">
          <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
            <div>
              <h2 className="font-headline text-4xl font-bold">Why Choose NyaySetu?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                In a world filled with complex legal jargon, NyaySetu is your bridge to clarity and confidence. We empower you to understand your rights and obligations without needing a law degree.
              </p>
              <ul className="mt-6 space-y-4 text-muted-foreground">
                <li className="flex items-start">
                  <ShieldCheck className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <span><strong>Empowerment:</strong> Make informed decisions by understanding what you're signing.</span>
                </li>
                <li className="flex items-start">
                  <Clock className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <span><strong>Time-Saving:</strong> Get instant analysis that would take hours to do manually.</span>
                </li>
                 <li className="flex items-start">
                  <BarChart className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <span><strong>Cost-Effective:</strong> Gain initial insights before committing to expensive legal fees.</span>
                </li>
              </ul>
            </div>
             <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-xl">
               <Image
                src="https://picsum.photos/seed/legal-robot/800/600"
                alt="Person reviewing a document"
                fill
                className="object-cover"
                data-ai-hint="legal robot"
              />
            </div>
          </div>
        </section>


        {/* Document Types Section */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="font-headline text-4xl font-bold">What We Analyze</h2>
              <p className="mt-2 text-muted-foreground">
                We handle a wide range of common legal and business documents.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 text-center md:grid-cols-4">
               <div className="space-y-2">
                <FileText className="mx-auto h-10 w-10 text-primary" />
                <p className="font-semibold">Rental Agreements</p>
              </div>
              <div className="space-y-2">
                <FileText className="mx-auto h-10 w-10 text-primary" />
                <p className="font-semibold">Employment Contracts</p>
              </div>
               <div className="space-y-2">
                <FileText className="mx-auto h-10 w-10 text-primary" />
                <p className="font-semibold">Vendor Agreements</p>
              </div>
               <div className="space-y-2">
                <FileText className="mx-auto h-10 w-10 text-primary" />
                <p className="font-semibold">NDAs</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div id="contact-us">
        <ContactUs />
      </div>
    </div>
  );
}
