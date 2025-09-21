'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Menu, User, BookUser, HelpCircle } from 'lucide-react';
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
        <DropdownMenuItem asChild>
          <Link href="#">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="#">
            <BookUser className="mr-2 h-4 w-4" />
            <span>My Documents</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/faq">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>FAQ</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <ThemeToggle />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
