'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home as HomeIcon } from 'lucide-react';
import { Logo } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import { Chat } from '@/components/chat';
import type { Message } from '@/components/chat';
import { DocumentAnalyzer } from '@/components/document-analyzer';
import { ContactUs } from '@/components/contact-us';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <header className="flex h-16 items-center justify-between border-b px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Logo className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-2xl font-bold tracking-tight text-foreground">
            NyaySetu
          </h1>
        </div>
        <ThemeToggle />
      </header>
      <div className="flex flex-1 overflow-hidden">
        {isSidebarOpen && (
          <aside className="hidden w-72 flex-col border-r bg-card/50 lg:flex">
            <div className="flex h-14 items-center border-b px-4">
              <h2 className="font-headline text-lg font-semibold">
                Menu
              </h2>
            </div>
            <nav className="flex flex-col gap-1 p-2">
               <Button
                variant={'secondary'}
                className="justify-start gap-3"
              >
                <HomeIcon className="h-5 w-5" />
                <span>Home</span>
              </Button>
            </nav>
          </aside>
        )}
        <main className="flex flex-1 flex-col overflow-y-auto">
            <div className="flex h-full flex-col">
              <div className="flex-1">
                <div className="p-4 md:p-6">
                   <div className="mx-auto w-full max-w-4xl">
                    <Chat
                      onMessagesChange={setChatHistory}
                      isHistoryPanel={false}
                      messages={chatHistory}
                    />
                  </div>
                </div>

                <Separator className="my-8" />
                
                <DocumentAnalyzer />
              </div>
              <div className="mt-auto">
                <ContactUs />
              </div>
            </div>
        </main>
      </div>
    </div>
  );
}
