
'use client';

import Link from 'next/link';
import { Logo } from '@/components/icons';
import { MainMenu } from '@/components/main-menu';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart, Clock, ShieldCheck } from 'lucide-react';
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
        <section className="relative h-[60vh] w-full">
          <Image
            src="https://picsum.photos/seed/legal-hero/1800/1200"
            alt="Law books and gavel"
            fill
            className="object-cover"
            data-ai-hint="law books gavel"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
            <h1 className="font-headline text-5xl font-bold md:text-7xl">
              AI-Powered Legal Analysis
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">
              Understand complex legal documents with ease. NyaySetu analyzes,
              simplifies, and provides actionable insights.
            </p>
            <Button asChild className="mt-8" size="lg">
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

        {/* Services Section */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="font-headline text-4xl font-bold">Our Services</h2>
              <p className="mt-2 text-muted-foreground">
                Everything you need to demystify legal documents.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
               <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="font-headline text-2xl font-semibold">Document Analysis</h3>
                <p className="mt-2 text-muted-foreground">Upload any legal document to get a clause-by-clause risk assessment and simplification.</p>
              </div>
               <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="font-headline text-2xl font-semibold">AI Legal Chatbot</h3>
                <p className="mt-2 text-muted-foreground">Ask any legal question in plain English and get clear, understandable answers from our AI assistant.</p>
              </div>
               <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="font-headline text-2xl font-semibold">Mind Map Generation</h3>
                <p className="mt-2 text-muted-foreground">Visualize the structure of your documents with automatically generated mind maps.</p>
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
