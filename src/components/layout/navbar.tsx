"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/retroui/Button";
import { Menu } from "@/components/retroui/icons";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/project", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const resumeHref = "/CV_Daniel_Hachac_Salas_Harvard_EN%20(2).pdf";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b-4 border-black bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="border-4 border-black bg-accent px-3 py-2 text-sm font-black text-accent-foreground tracking-wide shadow-retro sm:text-base"
        >
          ~/ Daniel Salas
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "border-4 border-black px-3 py-2 text-sm font-black uppercase tracking-wide shadow-retro transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-card-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={resumeHref}
            target="_blank"
            rel="noreferrer noopener"
            className="hidden border-4 border-black bg-primary px-3 py-2 text-sm font-black uppercase tracking-wide text-primary-foreground shadow-retro transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none md:inline-flex"
          >
            Resume
          </Link>
          <ThemeToggle />
          <Button
            variant="secondary"
            size="icon"
            className="md:hidden h-11 w-11"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-t-4 border-black bg-background p-4 md:hidden"
          >
            <div className="grid gap-2">
              <Link
                href={resumeHref}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => setOpen(false)}
                className="border-4 border-black bg-primary px-3 py-2 text-center text-sm font-black uppercase text-primary-foreground shadow-retro"
              >
                Resume
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "border-4 border-black px-3 py-2 text-center text-sm font-black uppercase shadow-retro",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-card-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
