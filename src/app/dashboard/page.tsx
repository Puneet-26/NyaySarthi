
'use client';

import { Logo } from '@/components/icons';
import { Chat, type Message } from '@/components/chat';
import { DocumentAnalyzer } from '@/components/document-analyzer';
import { ContactUs } from '@/components/contact-us';
import { Separator } from '@/components/ui/separator';
import { MainMenu } from '@/components/main-menu';
import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';


export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <header className="flex h-16 items-center justify-between border-b px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Logo className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-2xl font-bold tracking-tight text-foreground">
            NyaySetu
          </h1>
        </div>
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
                      messages={messages}
                      onMessagesChange={(newMessages) => setMessages(newMessages)}
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
