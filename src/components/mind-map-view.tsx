'use client';

import { useState, useTransition } from 'react';
import { getMindMap } from '@/app/actions';
import type { MindMapNode } from '@/ai/flows/mind-map-generator';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Zap } from 'lucide-react';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { cn } from '@/lib/utils';

const Node = ({ node, level = 0 }: { node: MindMapNode; level?: number }) => {
  if (!node) {
    return null;
  }
  const isRoot = level === 0;
  const hasChildren = Array.isArray(node.children) && node.children.length > 0;

  if (isRoot) {
    return (
      <div className="flex items-start justify-center">
        <div className="relative flex items-center">
          {/* Central Root Node */}
          <div className="z-10 flex-shrink-0 rounded-lg border-2 border-primary bg-primary/10 p-6 shadow-lg">
            <h2 className="text-center font-headline text-2xl font-bold text-primary">
              {node.topic}
            </h2>
            <p className="mt-2 max-w-xs text-center text-sm text-muted-foreground">
              {node.summary}
            </p>
          </div>

          {/* Horizontal line from root */}
          {hasChildren && <div className="h-px w-8 bg-foreground/80" />}

          {/* Children container */}
          {hasChildren && (
            <div className="relative flex flex-col items-start justify-center gap-8">
              {/* Vertical connecting line */}
              <div className="absolute bottom-0 left-0 top-0 w-px bg-foreground/80" />
              {node.children!.map((child, index) => (
                <Node key={index} node={child} level={level + 1} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative flex items-center">
       {/* Connecting line from parent */}
       <div className="absolute right-full top-1/2 h-px w-8 bg-foreground/80" />
      <div
        className={cn(
          'flex-shrink-0 rounded-lg border bg-card p-4 shadow-sm transition-all hover:border-primary hover:shadow-md'
        )}
      >
        <h3 className="font-headline text-lg">{node.topic}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{node.summary}</p>
      </div>

       {/* Horizontal line from node */}
      {hasChildren && <div className="h-px w-8 bg-foreground/80" />}

      {hasChildren && (
        <div className="relative flex flex-col items-start justify-center gap-4">
           {/* Vertical connecting line */}
           <div className="absolute bottom-0 left-0 top-0 w-px bg-foreground/80" />
          {node.children!.map((child, index) => (
            <Node key={index} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export function MindMapView({ documentText }: { documentText: string }) {
  const [mindMap, setMindMap] = useState<MindMapNode | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGenerateMindMap = () => {
    startTransition(async () => {
      const result = await getMindMap(documentText);
      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Failed to generate mind map',
          description: result.error,
        });
        setMindMap(null);
      } else {
        setMindMap(result.data || null);
      }
    });
  };

  if (!mindMap) {
    return (
       <Card className="flex flex-col items-center justify-center p-12 text-center">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Visualize Your Document</CardTitle>
          <CardDescription>
            Generate an interactive mind map to explore the structure and key concepts of your legal document.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <Button onClick={handleGenerateMindMap} disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
               <>
                <Zap className="mr-2 h-4 w-4" />
                Generate Mind Map
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className='p-4 overflow-x-auto'>
        <Node node={mindMap} />
    </div>
  );
}
