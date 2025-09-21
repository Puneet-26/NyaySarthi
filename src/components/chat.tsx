'use client';

import { useState, useTransition, useRef, useEffect, useCallback } from 'react';
import { Loader2, Mic, MicOff, Send, User } from 'lucide-react';
import { getChatbotResponse } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';
import { ChatbotLogo } from './icons';

export type Message = {
  role: 'user' | 'bot';
  content: string;
};

type ChatProps = {
  isHistoryPanel?: boolean;
  messages: Message[];
  onMessagesChange?: (messages: Message[]) => void;
};


export function Chat({ isHistoryPanel = false, messages, onMessagesChange }: ChatProps) {
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const setMessages = useCallback((updater: (prev: Message[]) => Message[]) => {
    if (onMessagesChange) {
      onMessagesChange(updater(messages));
    }
  }, [messages, onMessagesChange]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        setInput(finalTranscript + interimTranscript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        toast({
          variant: 'destructive',
          title: 'Voice Input Error',
          description: `An error occurred: ${event.error}`,
        });
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        // Check a local variable instead of the state because the state might be stale in this closure.
        // We only want to stop if the user explicitly clicked the button.
        // If the service stops on its own, it should restart.
      };

    }
  }, [toast]);
  
  const toggleRecording = () => {
    if (!recognitionRef.current) {
       toast({
        variant: 'destructive',
        title: 'Browser Not Supported',
        description: 'Your browser does not support voice input.',
      });
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || !onMessagesChange) return;

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    startTransition(async () => {
      const result = await getChatbotResponse(input);
      let botMessage: Message;
      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Chatbot Error',
          description: result.error,
        });
        botMessage = {
          role: 'bot',
          content: 'Sorry, I ran into an error. Please try again.',
        };
      } else {
        botMessage = {
          role: 'bot',
          content: result.data || 'No response available.',
        };
      }
      setMessages(prev => [...prev, botMessage]);
    });
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  const renderMessages = (messageList: Message[]) => {
     let lastMessageRole: 'user' | 'bot' | null = null;
    return messageList.map((message, index) => {
      const showSeparator = message.role === 'bot' && lastMessageRole === 'user';
      lastMessageRole = message.role;
      return (
        <div key={index}>
          {showSeparator && <Separator className="my-6" />}
          <div
            className={cn(
              'flex items-start gap-4'
            )}
          >
             <Avatar className="h-8 w-8 border">
              <AvatarFallback className="bg-background">
                {message.role === 'user' ? <User size={16} /> : <ChatbotLogo className="h-5 w-5" />}
              </AvatarFallback>
            </Avatar>
            {message.role === 'user' && (
              <div
                className={cn(
                  'max-w-md rounded-lg p-3'
                )}
              >
                <p className="text-sm font-medium">{message.content}</p>
              </div>
            )}
             {message.role === 'bot' && (
                <div
                className={cn(
                  'prose prose-sm dark:prose-invert max-w-none'
                )}
                dangerouslySetInnerHTML={{
                  __html: message.content.replace(/\n/g, '<br />'),
                }}
              />
            )}
          </div>
        </div>
      );
    });
  };
  
  if (isHistoryPanel) {
    return (
      <ScrollArea className="h-full">
        <div className="space-y-6 p-4">
          {messages.length === 0 ? (
            <p className="p-4 text-sm text-center text-muted-foreground">No chat history yet.</p>
          ) : renderMessages(messages)}
        </div>
      </ScrollArea>
    );
  }


  return (
    <div className="flex h-full w-full flex-col">
       <div className="flex items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-4">
          <div className="rounded-full border bg-card p-2">
            <ChatbotLogo className="h-10 w-10" />
          </div>
          <div>
            <h2 className="font-headline text-3xl font-semibold">
              NyaySetu Chat
            </h2>
            <p className="text-muted-foreground">Ask me any legal question</p>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="space-y-6 pr-4">
          {messages.length === 0 && (
             <div className="flex items-start gap-4">
               <Avatar className="h-8 w-8 border">
                  <AvatarFallback className='bg-background'>
                    <ChatbotLogo className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
               <div className="prose prose-sm dark:prose-invert max-w-none">
                <p>
                  Welcome to NyaySetu Chat! Ask me any legal question. Please note, I am an AI assistant and not a substitute for a qualified legal professional.
                </p>
              </div>
            </div>
          )}
          {renderMessages(messages)}
          {isPending && (
            <>
            <Separator className="my-6" />
            <div className="flex items-start gap-4">
               <Avatar className="h-8 w-8 border">
                  <AvatarFallback className="bg-background">
                    <ChatbotLogo className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <Loader2 className="h-5 w-5 animate-spin" />
            </div>
            </>
          )}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={isRecording ? 'Listening...' : 'Ask a legal question...'}
            className="min-h-0 flex-1 resize-none"
            rows={1}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
          />
           <Button type="button" size="icon" variant={isRecording ? "destructive" : "ghost"} onClick={toggleRecording}>
            {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            <span className="sr-only">{isRecording ? 'Stop recording' : 'Start recording'}</span>
          </Button>
          <Button type="submit" size="icon" disabled={isPending || !input.trim()}>
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
