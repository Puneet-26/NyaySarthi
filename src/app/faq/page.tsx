import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Logo } from '@/components/icons';
import { MainMenu } from '@/components/main-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const faqs = [
  {
    question: 'What is NyaySetu?',
    answer:
      'NyaySetu is an AI-powered legal analysis tool designed to help users understand complex legal documents. It analyzes clauses, identifies risks, and provides simplified explanations.',
  },
  {
    question: 'What types of documents can I analyze?',
    answer:
      'You can upload various document formats, including .pdf, .docx, and .txt. The tool is designed to handle a wide range of legal agreements and contracts.',
  },
  {
    question: 'Is the legal analysis a substitute for professional legal advice?',
    answer:
      'No. While NyaySetu provides powerful insights and simplifies legal jargon, it is not a substitute for advice from a qualified legal professional. The analysis is for informational purposes only.',
  },
  {
    question: 'How accurate is the risk assessment?',
    answer:
      'The AI uses advanced models to assess risk based on common legal principles and patterns. However, the risk levels are indicative and should be reviewed by a legal expert for critical applications.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'We take data privacy seriously. Documents are processed securely, and we do not store your files after the analysis is complete. Please refer to our privacy policy for more details.',
  },
];

export default function FAQPage() {
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
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h1 className="font-headline text-4xl font-bold">
              Frequently Asked Questions
            </h1>
            <p className="mt-2 text-muted-foreground">
              Find answers to common questions about NyaySetu.
            </p>
          </div>
          <Accordion type="single" collapsible className="mt-8 w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-12 text-center">
            <h2 className="font-headline text-2xl font-semibold">
              Still have questions?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Our team is here to help.
            </p>
            <Button asChild className="mt-4">
              <Link href="/#contact-us">Contact Us</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
