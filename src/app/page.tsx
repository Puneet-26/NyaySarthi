'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, PanelLeft, History, Database } from 'lucide-react';
import { Logo } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import { Chat } from '@/components/chat';
import type { Message } from '@/components/chat';
import { DataExplorer } from '@/components/data-explorer';

export default function Home() {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState<'chat' | 'explorer'>('chat');

  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <header className="flex h-16 items-center justify-between border-b px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(prev => !prev)}
            className="h-8 w-8"
          >
            <PanelLeft className="h-5 w-5" />
          </Button>
          <Logo className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-2xl font-bold tracking-tight text-foreground">
            Legali
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
                variant={activeView === 'chat' ? 'secondary' : 'ghost'}
                className="justify-start gap-3"
                onClick={() => setActiveView('chat')}
              >
                <Bot className="h-5 w-5" />
                <span>Chat</span>
              </Button>
              <Button
                variant={activeView === 'explorer' ? 'secondary' : 'ghost'}
                className="justify-start gap-3"
                onClick={() => setActiveView('explorer')}
              >
                <Database className="h-5 w-5" />
                <span>Data Explorer</span>
              </Button>
            </nav>
          </aside>
        )}
        <main className="flex-1 overflow-y-auto">
          {activeView === 'chat' ? (
            <div className="flex h-full flex-col items-center justify-center gap-6 p-4 text-center">
              <div className="w-full max-w-4xl flex-1">
                <Chat
                  onMessagesChange={setChatHistory}
                  isHistoryPanel={false}
                  messages={chatHistory}
                />
              </div>
            </div>
          ) : (
            <DataExplorer />
          )}
        </main>
      </div>
    </div>
  );
}
