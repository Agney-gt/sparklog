"use client"

import Link from "next/link";
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button"; // Adjust the import path as necessary
import { useState } from 'react';

const HeaderHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex flex-wrap items-center justify-between px-4 py-4 lg:px-6">
      <Link className="flex items-center justify-center" href="/login#">
        <span className="font-bold text-xl flex items-center">
          <span className="text-primary">sparklog</span>
        </span>
      </Link>
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
      <nav
        className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } w-full flex-col items-center gap-4 lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-6`}
      >
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/community">
          Community
        </Link>
        
      </nav>
    </header>
  );
};

export default HeaderHome; 