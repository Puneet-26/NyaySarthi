'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Search } from 'lucide-react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from './ui/scroll-area';
import { searchJudgementsAction } from '@/app/actions';
import { type Judgement } from '@/ai/schemas/search-judgements';
import { useToast } from '@/hooks/use-toast';

const indianCourts = [
  'Supreme Court of India',
  'High Court of Allahabad',
  'High Court of Andhra Pradesh',
  'High Court of Bombay',
  'High Court of Calcutta',
  'High Court of Chhattisgarh',
  'High Court of Delhi',
  'High Court of Gujarat',
  'High Court of Himachal Pradesh',
  'High Court of Jammu and Kashmir and Ladakh',
  'High Court of Jharkhand',
  'High Court of Karnataka',
  'High Court of Kerala',
  'High Court of Madhya Pradesh',
  'High Court of Madras',
  'High Court of Manipur',
  'High Court of Meghalaya',
  'High Court of Orissa',
  'High Court of Patna',
  'High Court of Punjab and Haryana',
  'High Court of Rajasthan',
  'High Court of Sikkim',
  'High Court of Telangana',
  'High Court of Tripura',
  'High Court of Uttarakhand',
];

export function DataExplorer() {
  const [court, setCourt] = useState('');
  const [judges, setJudges] = useState('');
  const [parties, setParties] = useState('');
  const [date, setDate] = useState<DateRange | undefined>();
  const [judgements, setJudgements] = useState<Judgement[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    setIsSearching(true);
    setJudgements([]);
    
    const result = await searchJudgementsAction({
      court,
      judges,
      parties,
      dateFrom: date?.from?.toISOString(),
      dateTo: date?.to?.toISOString(),
    });

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Search Failed',
        description: result.error,
      });
    } else {
      setJudgements(result.data?.judgements || []);
    }

    setIsSearching(false);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="p-4 sm:p-6 lg:p-8">
        <header className="mb-6">
          <h1 className="font-headline text-3xl font-bold">Data Explorer</h1>
          <p className="text-muted-foreground">
            Search for court judgements.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Search Filters</CardTitle>
            <CardDescription>
              Refine your search for judgements using the filters below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="court-name">Name of Court</Label>
                <Select value={court} onValueChange={setCourt}>
                  <SelectTrigger id="court-name">
                    <SelectValue placeholder="Select a court" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianCourts.map(c => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-range">Date Range</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date-range"
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, 'LLL dd, y')} -{' '}
                            {format(date.to, 'LLL dd, y')}
                          </>
                        ) : (
                          format(date.from, 'LLL dd, y')
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="judges">Presiding Judges</Label>
                <Input
                  id="judges"
                  placeholder="e.g., Justice H.R. Khanna"
                  value={judges}
                  onChange={e => setJudges(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parties">Parties Involved</Label>
                <Input
                  id="parties"
                  placeholder="e.g., Kesavananda Bharati vs. State of Kerala"
                  value={parties}
                  onChange={e => setParties(e.target.value)}
                />
              </div>
              <div className="flex items-end md:col-span-2 lg:col-span-3">
                <Button onClick={handleSearch} disabled={isSearching} className="w-full md:w-auto">
                  <Search className="mr-2 h-4 w-4" />
                  {isSearching ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex-1 overflow-hidden px-4 sm:px-6 lg:px-8 pb-8">
        <Card className="h-full">
           <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>
              {judgements.length} judgements found.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <ScrollArea className="h-[40vh]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case Name</TableHead>
                    <TableHead>Court</TableHead>
                    <TableHead>Judges</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isSearching ? (
                     <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        Searching for judgements...
                      </TableCell>
                    </TableRow>
                  ) : judgements.length > 0 ? (
                    judgements.map((judgement, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{judgement.caseName}</TableCell>
                        <TableCell>{judgement.court}</TableCell>
                        <TableCell className="max-w-xs truncate">{judgement.judges.join(', ')}</TableCell>
                        <TableCell>{judgement.date}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        No results found. Try adjusting your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
