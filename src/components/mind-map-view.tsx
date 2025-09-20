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
  const isRoot = level === 0;
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className={cn(!isRoot && 'ml-6 pl-6 border-l border-dashed border-primary/50')}>
      <div className="relative">
        <div
          className={cn(
            'p-4 rounded-lg shadow-sm',
            isRoot ? 'bg-primary/10 border-primary border-2' : 'bg-card border'
          )}
        >
          <h3
            className={cn(
              'font-headline',
               isRoot ? 'text-xl' : 'text-lg',
            )}
          >
            {node.topic}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{node.summary}</p>
        </div>
        {!isRoot && (
           <div className="absolute -left-6 top-1/2 -translate-y-1/2 h-px w-6 bg-primary/50" />
        )}
      </div>
      {hasChildren && (
        <div className="mt-4 space-y-4">
          {node.children.map((child, index) => (
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
    <div>
        <Node node={mindMap} />
    </div>
  );
}
