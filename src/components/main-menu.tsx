'use client';

import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Menu, User, BookUser } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export function MainMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <BookUser className="mr-2 h-4 w-4" />
          <span>My Documents</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <ThemeToggle />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
