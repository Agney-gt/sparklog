"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button"; // Adjust the import path if necessary
import { useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const HeaderHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen((prev) => typeof prev === "boolean" ? !prev : false);

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
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
      <nav
        className={clsx(
          "w-full flex-col items-center gap-4 lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-6",
          { flex: isMenuOpen, hidden: !isMenuOpen }
        )}
      >
        <Link
          className={`text-sm font-medium hover:underline underline-offset-4 ${
            pathname === "/community" ? "text-primary" : ""
          }`}
          href="/community"
        >
          Community
        </Link>
      </nav>
    </header>
  );
};

export default HeaderHome;
