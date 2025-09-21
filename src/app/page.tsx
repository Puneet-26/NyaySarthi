'use client';

import Link from 'next/link';
import { Logo } from '@/components/icons';
import { Chat } from '@/components/chat';
import { DocumentAnalyzer } from '@/components/document-analyzer';
import { ContactUs } from '@/components/contact-us';
import { Separator } from '@/components/ui/separator';
import { MainMenu } from '@/components/main-menu';

export default function Home() {
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
      <div className="flex flex-1 overflow-hidden">
        <main className="flex flex-1 flex-col overflow-y-auto">
            <div className="flex h-full flex-col">
              <div className="flex-1">
                <div className="p-4 md:p-6">
                   <div className="mx-auto w-full max-w-4xl">
                    <Chat
                      isHistoryPanel={false}
                      messages={[]}
                    />
                  </div>
                </div>

                <Separator className="my-8" />
                
                <DocumentAnalyzer />
              </div>
              <div id="contact-us" className="mt-auto">
                <ContactUs />
              </div>
            </div>
        </main>
      </div>
    </div>
  );
}
