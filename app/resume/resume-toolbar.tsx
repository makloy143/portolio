"use client";

import Link from "next/link";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

export function ResumeToolbar() {
  return (
    <div className="no-print sticky top-0 z-10 border-b bg-background/85 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-[8.5in] items-center justify-between gap-3 px-4">
        <Link href="/" className={cn(buttonVariants({ variant: "ghost" }), "h-9 rounded-full px-3")}>
          <ArrowLeft className="size-4" />
          <span className="hidden sm:inline">Back to portfolio</span>
          <span className="sm:hidden">Back</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9 rounded-full px-4" onClick={() => window.print()}>
            <Printer className="size-4" />
            Print
          </Button>
          <a
            href={siteConfig.resumePath}
            download={siteConfig.resumeFileName}
            className={cn(buttonVariants(), "h-9 rounded-full px-4")}
          >
            <Download className="size-4" />
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}
