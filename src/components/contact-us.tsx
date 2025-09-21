'use client';

import { Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function ContactUs() {
  return (
    <footer className="w-full bg-card text-card-foreground">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div className="space-y-4">
          <h3 className="font-headline text-xl font-bold">NyaySetu</h3>
          <p className="text-muted-foreground">
            AI-powered legal analysis for everyone.
          </p>
          <div className="flex items-center space-x-4">
            <a href="#" aria-label="Github">
              <Github className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
            </a>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-headline text-lg font-semibold">Contact Us</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>123 Legal Tech Avenue, Suite 456</p>
            <p>New Delhi, 110001, India</p>
            <p>Email: contact@nyaysetu.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-headline text-lg font-semibold">
            Stay Updated
          </h4>
          <p className="text-sm text-muted-foreground">
            Subscribe to our newsletter for the latest updates on legal tech and
            AI.
          </p>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="email" placeholder="Email" />
            <Button type="submit">Subscribe</Button>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 text-sm text-muted-foreground md:px-6">
          <p>&copy; 2024 NyaySetu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
